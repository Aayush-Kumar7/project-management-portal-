// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  deadline: { type: String },
  assignedTo: {type:String},
  createdAt: { type: Date, default: Date.now }
});

const ProjectModel = mongoose.model('Project', projectSchema);
module.exports = ProjectModel;
