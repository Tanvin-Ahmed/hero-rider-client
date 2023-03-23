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

export const getUserCount = async () => {
  try {
    const { data } = await axios.get("/users/total-count");

    return {
      errorMessage: null,
      count: data.count,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data.message || error.message,
      count: 0,
    };
  }
};

export const getUsersInfo = async (limit, page) => {
  try {
    const { data } = await axios.get(`/users/get?limit=${limit}&page=${page}`);
    return {
      errorMessage: null,
      data: data || [],
    };
  } catch (error) {
    return {
      errorMessage: error.response.data.message || error.message,
      data: [],
    };
  }
};

export const updateUsersStatus = async (info) => {
  try {
    await axios.put("/users/update-status", info);
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: error.response.data.message || error.message };
  }
};
