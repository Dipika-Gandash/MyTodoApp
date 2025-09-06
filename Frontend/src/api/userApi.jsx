import axios from "axios";

const API_URL = "http://localhost:3000/user";

export const registerApi = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const loginApi = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const profileApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
