import { createContext, useEffect, useState } from "react";
import { checkToken } from "../utils/auth/checkToken";
import { getUserInfo } from "../utils/auth/getUserInfo";

export const userInfoContext = createContext();

const UserInfo = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (checkToken()) {
      setUserInfo(getUserInfo());
    }
  }, []);

  console.log(userInfo);

  const values = { userInfo, setUserInfo };

  return (
    <userInfoContext.Provider value={values}>
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfo;
