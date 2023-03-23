import axios from "./axiosInstance";

export const generatePaymentClientSecret = async (price) => {
  try {
    const {
      data: { clientSecret },
    } = await axios.post("/payment/create-payment-intent", { price });

    return {
      clientSecret,
      errorMessage: null,
    };
  } catch (error) {
    return {
      clientSecret: null,
      errorMessage: error.response.data.message || error.message,
    };
  }
};
