import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [2, "Title must be at least 2 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"],
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false
  },

  createdAt : {
    type: Date,
    default: Date.now,
    immutable: true
  },

  dueDate: {
    type : Date,
    validate : {
        validator: function (value){
            if (!value) return true;
            return value > this.createdAt;
        },
        message : "Due date must be after created date"
    }
  },

  priority: {
    type: String,
    enum : ["low", "medium", "high"],
    default : "medium"
  }
});


const Todo = mongoose.model("Todo", todoSchema);

export default Todo;