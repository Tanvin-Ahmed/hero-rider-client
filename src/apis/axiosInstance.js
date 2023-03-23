import axios from "axios";
import { checkTokenSyntax } from "../utils/auth/checkToken";

axios.defaults.baseURL = "http://localhost:4000";
axios.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("access-token");

    if (
      userDetails !== "undefined" &&
      userDetails !== "null" &&
      userDetails !== ""
    ) {
      const token = JSON.parse(userDetails);
      const pattern = checkTokenSyntax(token);

      if (pattern) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
