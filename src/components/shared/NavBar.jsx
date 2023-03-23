import { Link, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useContext } from "react";
import { userInfoContext } from "../../context/UserInfo";
import { logoutUser } from "../../utils/auth/logoutUser";
import avatar from "../../assets/avatar.png";

const NavBar = () => {
  const { userInfo, setUserInfo } = useContext(userInfoContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserInfo(null);
    logoutUser();
    navigate("/");
  };

  return (
    <div className="navbar sticky top-0 bg-purple-900 z-50">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Hero Rider
        </Link>
      </div>
      <div className="flex-none">
        {userInfo ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {userInfo?.profile ? (
                  <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                    publicId={userInfo?.profile}
                  />
                ) : (
                  <img src={avatar} alt="" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              {userInfo?.role === "admin" && (
                <li>
                  <Link to={"/admin"}>Admin</Link>
                </li>
              )}
              <li>
                <div onClick={handleLogout}>Logout</div>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"} className="btn btn-ghost normal-case">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
