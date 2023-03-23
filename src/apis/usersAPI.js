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

export const getUserCountByEmail = async (email) => {
  try {
    const { data } = await axios.get(
      "/users/total-count-by-email?email=" + email
    );

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

export const getUserCountByPhone = async (phone) => {
  try {
    const { data } = await axios.get(
      "/users/total-count-by-phone?phone=" + phone
    );

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

export const getUserCountByFullName = async (fullName) => {
  try {
    const { data } = await axios.get(
      "/users/total-count-by-fullName?fullName=" + fullName
    );

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

export const getUserCountByAgeRange = async (range) => {
  try {
    const { data } = await axios.post("/users/total-count-by-age-range", range);

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

export const searchByEmail = async (info) => {
  try {
    const { data } = await axios.get(
      `/users/search/email?email=${info.email}&limit=${info.limit}&page=${info.page}`
    );

    return {
      data: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data.message || error.message,
      data: [],
    };
  }
};

export const searchByFullName = async (info) => {
  try {
    const { data } = await axios.get(
      `/users/search/fullName?fullName=${info.fullName}&limit=${info.limit}&page=${info.page}`
    );

    return {
      data: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data.message || error.message,
      data: [],
    };
  }
};

export const searchByPhone = async (info) => {
  try {
    const { data } = await axios.get(
      `/users/search/phone?phone=${info.phone}&limit=${info.limit}&page=${info.page}`
    );

    return {
      data: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data.message || error.message,
      data: [],
    };
  }
};

export const searchByAgeRange = async (info) => {
  try {
    const { data } = await axios.post(`/users/search/age-range`, info);

    return {
      data: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data.message || error.message,
      data: [],
    };
  }
};
