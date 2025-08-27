import axios from "axios";

const API_URL = "http://localhost:3000/todo";

export const fetchAllTodos = async (params = {}) => {
  const response =  axios.get(`${API_URL}/todos`, {
    params,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
