const express = require('express');
const router = express.Router();
const ProjectModel = require('../models/Projects');
const UserModel = require('../models/User');

// ✅ Get projects for specific user
router.get('/user/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const projects = await ProjectModel.find({ assignedTo: user._id });
    res.status(200).json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
});



// ✅ Get all projects (for admin)
// router.get('/all', async (req, res) => {
//   try {
//     const projects = await ProjectModel.find();
//     res.status(200).json({ success: true, projects });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Failed to fetch all projects' });
//   }
// });

// ✅ Add new project
router.post('/addproject', async (req, res) => {
  try {
    const { name, description, deadline, assignedTo } = req.body;
    const project = new ProjectModel({ name, description, deadline, assignedTo });
    await project.save();
    res.status(201).json({ success: true, message: 'Project added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add project' });
  }
});

// ✅ Update project
router.put('/update/:id', async (req, res) => {
  try {
    const { name, description, deadline, assignedTo } = req.body;
    await ProjectModel.findByIdAndUpdate(req.params.id, {
      name,
      description,
      deadline,
      assignedTo
    });
    res.status(200).json({ success: true, message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update project' });
  }
});

// ✅ Delete project
router.delete('/delete/:id', async (req, res) => {
  try {
    await ProjectModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
});

module.exports = router;
