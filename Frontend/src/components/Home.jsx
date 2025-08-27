import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchAllTodos } from "../api/todoApi";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await fetchAllTodos();
        if (response.success) {
          setTodos(response.todos || []);
        } else {
          setError(response.todos.message);
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, []);
  return (
    <div>
      <h2>My Todos</h2>
     
    </div>
  )
};

export default Home;
