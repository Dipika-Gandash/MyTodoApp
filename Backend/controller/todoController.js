import Todo from "../models/Todo.js";

export const fetchAllTodo = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const filter = {};

    // Priority filter
    if (req.query.priority) {
      const allowedPriorities = ["low", "medium", "high"];
      if (!allowedPriorities.includes(req.query.priority)) {
        return res.status(400).json({
          success: false,
          message: "Invalid priority value. Allowed: low, medium, high",
        });
      }
      filter.priority = req.query.priority;
    }

    // Completed filter
    if (req.query.completed) {
      if (req.query.completed === "true") {
        filter.completed = true;
      } else if (req.query.completed === "false") {
        filter.completed = false;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid completed value. Allowed: true or false",
        });
      }
    }

    // DueDate Filter
    if (req.query.dueDate) {
      const dueDate = new Date(req.query.dueDate);
      if (isNaN(dueDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid dueDate format. Use ISO format (YYYY-MM-DD)",
        });
      }
      filter.dueDate = {$lte : dueDate}
    }

    const allTodos = await Todo.find(filter).skip(skip).limit(limit);

    if (allTodos.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No todos found!",
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

export const updateTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Todo status must be true or false",
      });
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: `Todo marked as ${completed ? "complete" : "incomplete"}`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
