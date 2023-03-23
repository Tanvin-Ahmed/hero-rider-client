import { setLocalStorage } from "../utils/localStorageMethods";
import axios from "./axiosInstance";

export const registerUser = async (info) => {
  try {
    const { data } = await axios.post("/users/register", info);
    setLocalStorage("access-token", data);
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: error.response.data.message || error.message };
  }
};

export const loginUser = async (info) => {
  try {
    const { data } = await axios.post("/users/login", info);
    setLocalStorage("access-token", data);
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: error.response.data.message || error.message };
  }
};
