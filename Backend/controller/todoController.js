import Todo from "../models/Todo.js";

export const fetchAllTodo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const allTodos = await Todo.find().skip(skip).limit(limit);

    if (allTodos.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No todos found, create some todos!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      todos: allTodos,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  const { title, completed, createdAt, dueDate, priority } = req.body;
  try {
    const todo = new Todo({ title, completed, createdAt, dueDate, priority });

    await todo.save();
    res.status(201).json({ todo });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.createdAt) {
      delete req.body.createdAt;
    }

    const updateTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!",
      });
    }

    res.json({
      message: "Todo updated successfully",
      updateTodo,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
