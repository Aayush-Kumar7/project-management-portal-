// router/AdminRouter.js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const ProjectModel = require('../models/Projects');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find({ role: 'user' }, 'name email role createdAt');
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

 
router.get('/user/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, _id: user._id });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
});

// Add new project
// router.post('/addproject', async (req, res) => {
//   try {
//     const { name, description, deadline, assignedTo } = req.body;
//     const project = new ProjectModel({ name, description, deadline, assignedTo });
//     await project.save();
//     res.status(201).json({ success: true, message: 'Project added successfully' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Failed to add project' });
//   }
// });

module.exports = router;
