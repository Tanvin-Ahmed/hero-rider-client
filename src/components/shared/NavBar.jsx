import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar sticky top-0 bg-purple-900">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Hero Rider
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt=""
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between" href="#fd">
                Profile
              </a>
            </li>
            <li>
              <a href="#fs">Admin</a>
            </li>
            <li>
              <a href="#fs">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
