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

module.exports = router;