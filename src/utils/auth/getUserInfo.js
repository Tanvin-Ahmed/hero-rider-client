import jwt_decode from "jwt-decode";
import { getLocalStorage } from "../localStorageMethods";
import { checkTokenSyntax } from "./checkToken";

export const getUserInfo = () => {
  const token = getLocalStorage("access-token");

  if (!token) return false;

  const pattern = checkTokenSyntax(token);

  if (pattern) {
    const { data } = jwt_decode(token);
    return data;
  }

  return null;
};
