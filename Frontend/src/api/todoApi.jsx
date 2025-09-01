import axios from "axios";

const API_URL = "http://localhost:3000/todo";

export const fetchAllTodosApi = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/todos`, {
      params,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("You must be logged in to see your todos.");
    } else {
      throw new Error("Failed to Fetch todo.");
    }
  }
};

export const createTodoApi = async (todoData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, todoData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("You must be logged in to create a todo.");
    } else {
      throw new Error("Failed to create todo.");
    }
  }
};
