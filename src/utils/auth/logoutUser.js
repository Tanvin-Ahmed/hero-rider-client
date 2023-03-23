import { removeLocalStorage } from "../localStorageMethods";

export const logoutUser = () => {
  removeLocalStorage("access-token");
};
