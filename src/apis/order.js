import axios from "./axiosInstance";

export const createOrder = async (info) => {
  try {
    const { data } = await axios.post("/order/create", info);

    return {
      order: data,
      errorMessage: null,
    };
  } catch (error) {
    return {
      order: null,
      errorMessage: error,
    };
  }
};

export const getOrders = async (userId) => {
  try {
    const { data } = await axios.get("/order/get/" + userId);

    return {
      orders: data || [],
      errorMessage: null,
    };
  } catch (error) {
    return {
      orders: [],
      errorMessage: error.response.data.message || error.message,
    };
  }
};
