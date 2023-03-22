import { useState } from "react";
import { userList } from "../../utils/data";
import Pagination from "../shared/Pagination";

const UserTable = () => {
  const [usersData] = useState(userList || []);
  const [selectedItemsId, setSelectedItemsId] = useState([]);
  const [ageRange, setAgeRange] = useState({
    from: 0,
    to: 0,
  });
  const [searchText, setSearchText] = useState(null);

  const handleBulkChange = (e) => {
    if (e.target.checked) {
      if (e.target.value === "all") {
        setSelectedItemsId(usersData?.map((user) => user?._id));
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!isNaN(selectedItemsId)) {
      // phone number
    } else {
      if (
        String(selectedItemsId)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        //   search by email
      } else {
        //   search by full name
      }
    }
  };

  const handleSearchByAge = (e) => {
    e.preventDefault();
  };

  const handleBlock = () => {};

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
          <button
            className="my-4 text-white font-bold py-2 px-4 rounded-r bg-red-600 hover:bg-red-700"
            onClick={handleBlock}
          >
            Block selected users
          </button>
        )}
        <table className="table w-full" onChange={handleBulkChange}>
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" value={"all"} />
                </label>
              </th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
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
                        <img src={user?.profile} alt={user?.fullName} />
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
                <td>
                  <div
                    className={`badge badge-ghost badge-sm text-sm font-medium ${
                      user?.status === "Normal"
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
        <Pagination />
      </div>
    </>
  );
};

export default UserTable;
