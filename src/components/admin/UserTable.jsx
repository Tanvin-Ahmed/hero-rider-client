import { useEffect, useState } from "react";
import {
  getUserCount,
  getUserCountByAgeRange,
  getUserCountByEmail,
  getUserCountByFullName,
  getUserCountByPhone,
  getUsersInfo,
  searchByAgeRange,
  searchByEmail,
  searchByFullName,
  searchByPhone,
  updateUsersStatus,
} from "../../apis/usersAPI";
import Pagination from "../shared/Pagination";
import { Image } from "cloudinary-react";
import avatar from "../../assets/avatar.png";
import Loader from "../shared/Loader";

const UserTable = () => {
  const [usersList, setUserList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedItemsId, setSelectedItemsId] = useState([]);
  const [ageRange, setAgeRange] = useState({
    from: 0,
    to: 0,
  });
  const [searchText, setSearchText] = useState("");

  const [totalPages, setTotalPages] = useState(0);
  const [rows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const { count } = await getUserCount();
      if (count) {
        setTotalPages(Math.ceil(count / rows));
        const { data, errorMessage } = await getUsersInfo(rows, 1);
        if (errorMessage) {
          alert(errorMessage);
        } else {
          setUserList(data);
        }
      }
      setLoading(false);
    };
    get();
  }, [rows]);

  const handlePageChange = async (currentPage) => {
    if (searchText.trim()) {
      if (!isNaN(searchText)) {
        // phone number
        const { data, errorMessage } = await searchByPhone({
          phone: searchText,
          limit: rows,
          page: currentPage,
        });
        if (errorMessage) return alert(errorMessage);
        setUserList((user) => [...user, ...data]);
      } else if (
        String(searchText)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        //   search by email
        const { data, errorMessage } = await searchByEmail({
          email: searchText.split("@")[0],
          limit: rows,
          page: currentPage,
        });
        if (errorMessage) return alert(errorMessage);
        setUserList((user) => [...user, ...data]);
      } else {
        // full name
        const { data, errorMessage } = await searchByFullName({
          name: searchText,
          limit: rows,
          page: currentPage,
        });
        if (errorMessage) return alert(errorMessage);
        setUserList((user) => [...user, ...data]);
      }
    } else if (ageRange.from && ageRange.to) {
      const { data, errorMessage } = await searchByAgeRange({
        range: ageRange,
        limit: rows,
        page: currentPage,
      });
      if (errorMessage) return alert(errorMessage);
      setUserList((user) => [...user, ...data]);
    } else {
      const { data, errorMessage } = await getUsersInfo(rows, currentPage);
      if (errorMessage) {
        alert(errorMessage);
      } else {
        setUserList((users) => [...users, ...data]);
      }
    }
  };

  useEffect(() => {
    if (usersList.length && selectedItemsId.length === usersList.length) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [selectedItemsId.length, usersList.length]);

  const handleBulkChange = (e) => {
    if (e.target.checked) {
      if (e.target.value === "all") {
        setSelectedItemsId(
          usersList
            ?.slice((currentPage - 1) * rows, (currentPage - 1) * rows + rows)
            .map((user) => user?._id)
        );
      } else {
        setSelectedItemsId((p) => [...p, e.target.value]);
      }
    } else {
      if (e.target.value === "all") {
        setSelectedItemsId([]);
      } else {
        setSelectedItemsId((p) => p.filter((id) => id !== e.target.value));
      }
    }
  };

  const handleBlockBlock = async () => {
    const { errorMessage } = await updateUsersStatus({
      _ids: selectedItemsId,
      status: "blocked",
    });

    if (errorMessage) {
      alert(errorMessage);
    } else {
      setUserList((users) =>
        users.map((u) => {
          for (let i = 0; i < selectedItemsId.length; i++) {
            if (selectedItemsId[i] === u?._id) {
              return { ...u, status: "blocked" };
            }
          }
          return u;
        })
      );

      setSelectedItemsId([]);
      setCheckAll(false);
    }
  };

  const handleUnblockBlock = async () => {
    const { errorMessage } = await updateUsersStatus({
      _ids: selectedItemsId,
      status: "normal",
    });

    if (errorMessage) {
      alert(errorMessage);
    } else {
      setUserList((users) =>
        users.map((u) => {
          for (let i = 0; i < selectedItemsId.length; i++) {
            if (selectedItemsId[i] === u?._id) {
              return { ...u, status: "normal" };
            }
          }
          return u;
        })
      );
      setSelectedItemsId([]);
      setCheckAll(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    setCurrentPage(1);

    if (searchText.trim()) setUserList([]);

    if (!isNaN(searchText)) {
      // phone number
      const { count } = await getUserCountByPhone(searchText);
      const totalPage = Math.ceil(count / rows);
      setTotalPages(totalPage);
      if (totalPage) {
        const { data, errorMessage } = await searchByPhone({
          phone: searchText,
          limit: rows,
          page: 1,
        });
        if (errorMessage) return alert(errorMessage);
        setUserList(data);
      }
    } else {
      if (
        String(searchText)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        //   search by email
        const { count } = await getUserCountByEmail(searchText.split("@")[0]);
        const totalPage = Math.ceil(count / rows);
        setTotalPages(totalPage);
        if (totalPage) {
          const { data, errorMessage } = await searchByEmail({
            email: searchText.split("@")[0],
            limit: rows,
            page: 1,
          });
          if (errorMessage) return alert(errorMessage);
          setUserList(data);
        }
      } else {
        //   search by full name
        const { count } = await getUserCountByFullName(searchText);
        const totalPage = Math.ceil(count / rows);
        setTotalPages(totalPage);
        if (totalPage) {
          const { data, errorMessage } = await searchByFullName({
            name: searchText,
            limit: rows,
            page: 1,
          });
          if (errorMessage) return alert(errorMessage);
          setUserList(data);
        }
      }
    }
  };

  const handleSearchByAge = async (e) => {
    e.preventDefault();

    setCurrentPage(1);
    if (!ageRange.from && ageRange.to) return;

    setUserList([]);

    const { count } = await getUserCountByAgeRange(ageRange);
    const totalPage = Math.ceil(count / rows);
    setTotalPages(totalPage);
    if (totalPage) {
      const { data, errorMessage } = await searchByAgeRange({
        range: ageRange,
        limit: rows,
        page: 1,
      });
      if (errorMessage) return alert(errorMessage);
      setUserList(data);
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <form onSubmit={handleSearchSubmit}>
          Search by text:
          <label className="flex justify-center gap-y-2 mt-4">
            <input
              type="text"
              placeholder="Search by full name / email / phone number"
              className="rounded-l px-3 py-2 w-full outline-none placeholder:text-[14px]"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              autoFocus
              required
            />
            <button
              type="submit"
              className="text-white font-bold py-2 px-4 rounded-r bg-purple-600 hover:bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </label>
        </form>

        <form onSubmit={handleSearchByAge}>
          Search by age:
          <label className="flex justify-center mt-4">
            <input
              type="number"
              placeholder="Age from "
              className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
              onChange={(e) =>
                setAgeRange((a) => ({ ...a, from: e.target.value }))
              }
              value={ageRange?.from}
              required
            />
            <input
              type="number"
              placeholder="Age to"
              className="rounded-l ml-1 px-3 py-2 w-full outline-none placeholder:text-[14px]"
              onChange={(e) =>
                setAgeRange((a) => ({ ...a, to: e.target.value }))
              }
              value={ageRange?.to}
              required
            />
            <button
              type="submit"
              className="text-white font-bold py-2 px-4 rounded-r bg-purple-600 hover:bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </label>
        </form>
      </div>

      <div className="overflow-x-auto w-full mt-6">
        <h1 className="text-[25px] text-center">Users List</h1>
        {!!selectedItemsId.length && (
          <div className="flex gap-4">
            <button
              className="my-4 text-white font-bold py-2 px-4 rounded bg-red-600 hover:bg-red-700"
              onClick={handleBlockBlock}
            >
              Block
            </button>
            <button
              className="my-4 text-white font-bold py-2 px-4 rounded bg-purple-600 hover:bg-purple-700"
              onClick={handleUnblockBlock}
            >
              Unblock
            </button>
          </div>
        )}
        {loading ? (
          <Loader />
        ) : (
          <table className="table w-full" onChange={handleBulkChange}>
            <thead>
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={"all"}
                      checked={checkAll}
                      onChange={(e) => setCheckAll(e.target.checked)}
                    />
                  </label>
                </th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Age</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usersList
                .slice(
                  (currentPage - 1) * rows,
                  (currentPage - 1) * rows + rows
                )
                .map((user) => (
                  <tr key={user?._id}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={user?._id}
                          checked={selectedItemsId.find((u) => u === user?._id)}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            {user?.profile ? (
                              <Image
                                cloudName={
                                  process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
                                }
                                publicId={user?.profile}
                              />
                            ) : (
                              <img src={avatar} alt={user?.fullName} />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.fullName}</div>
                          <div
                            className={`badge badge-ghost badge-sm text-sm font-medium ${
                              user?.role === "rider"
                                ? "dark:bg-green-900 dark:text-green-300"
                                : "dark:bg-purple-900 dark:text-purple-300"
                            }`}
                          >
                            {user?.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user?.phone}</td>
                    <td>{user?.email}</td>
                    <td>{user?.age}</td>
                    <td>
                      <div
                        className={`badge badge-ghost badge-sm text-sm font-medium ${
                          user?.status === "normal"
                            ? "dark:bg-blue-900 dark:text-blue-300"
                            : "dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {user?.status}
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default UserTable;
