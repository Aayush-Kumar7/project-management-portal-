const mongoose = require("mongoose");

// ✅ Define Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["To-Do", "In Progress", "Done"],
      default: "To-Do",
    },

    ETA: {
      type: Date,
      required: [true, "ETA (deadline) is required"],
    },

    assignee: {
      type: String,
      required: [true, "Assignee is required"],
    },

    projectId: {
      type: String, // changed from ObjectId to String,
      required: [true, "Project ID is required"],
    },

  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// ✅ Export Model
const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;