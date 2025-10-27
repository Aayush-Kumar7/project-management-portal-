const express = require("express");
const router = express.Router();
const TaskModel = require("../models/Tasks");

//
// ✅ 1. Add New Task
//
router.post("/add", async (req, res) => {
  try {
    const { title, status, ETA, assignee, projectId } = req.body;

    if (!title || !status || !ETA || !assignee || !projectId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newTask = new TaskModel({
      title,
      status,
      ETA,
      assignee,
      projectId,
    });

    await newTask.save();
    res
      .status(201)
      .json({ success: true, message: "Task added successfully", task: newTask });
  } catch (err) {
    console.error("Error adding task:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while adding task" });
  }
});

//
// ✅ 2. Get all tasks assigned to a specific user
//
router.get("/user/:id", async (req, res) => {
  try {
    const tasks = await TaskModel.find({ assignee: req.params.id });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    console.error("Error fetching user tasks:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user tasks" });
  }
});

//
// ✅ 3. Get all tasks for a specific project
//
router.get("/project/:projectId", async (req, res) => {
  try {
    const tasks = await TaskModel.find({ projectId: req.params.projectId });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    console.error("Error fetching project tasks:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch project tasks" });
  }
});

//
// ✅ 4. Update a task
//
router.put("/update/:id", async (req, res) => {
  try {
    const { title, status, ETA, assignee } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { title, status, ETA, assignee },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update task" });
  }
});

//
// ✅ 5. Delete a task
//
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete task" });
  }
});

module.exports = router;
