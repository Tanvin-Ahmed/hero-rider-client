import { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { userInfoContext } from "../context/UserInfo";
import { checkToken } from "../utils/auth/checkToken";
import { logoutUser } from "../utils/auth/logoutUser";

const PrivateRoute = ({ children }) => {
  const { setUserInfo } = useContext(userInfoContext);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = checkToken();

  if (!auth) {
    logoutUser();
    setUserInfo(null);
    navigate("/");
  }

  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
