import React, { useEffect, useState } from "react";
import { fetchAllTodosApi , createTodoApi} from "../api/todoApi";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await fetchAllTodosApi();
        if (response.success) {
          setTodos(response.todos);
          console.log(response)
        } else {
          setError(response.message || "Failed to fetch todos");
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, []);

  const todoCreate = async () => {
    if(!newTodo.trim()) return ;
    setLoading(true);
    setError(null);
    try{
      
      const todoData = {
        title: newTodo
      };

      if (priority.trim() !== "") todoData.priority = priority;
if (dueDate.trim() !== "") todoData.dueDate = dueDate;

      const response = await createTodoApi(todoData);

      if(response.success){
        setTodos((prevTodos) => [...prevTodos, response.todo]);
        setNewTodo("");
        setPriority("");
        setDueDate("");
      }
      else{
        setError(response.message || "Failed to create todo.");
      }
    }catch (err) {
      setError(err.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>My Todos</h2>
    </div>
  );
};



export default Home;
