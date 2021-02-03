const mongoose = require('mongoose');
const Project = require('../model/Project');
const User = require('../model/User');

// @desc    GET all projects
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res) => {
	const projects = await Project.find({}).populate('users', 'name');
	res.json({ success: true, length: projects.length, data: projects });
};

// @desc    GET a project
// @route   GET /api/projects/:id
// @access  Private
exports.getProject = async (req, res) => {
	const project = await Project.findById(req.params.id).populate(
		'users',
		'name'
	);

	res.json(project);
};

// @desc    ADD a project
// @route   POST /api/projects
// @access  Private
exports.addProject = async (req, res) => {
	await Project.create(req.body);
	res.json({ success: true });
};

// @desc    UPDATE a user
// @route   PUT /api/users/:id
// @access  Private
exports.updateProject = async (req, res) => {
	let project = req.body;
	project = await User.findbyIdAndUpdate(req.params.id, project);
	res.json(project);
};

// @desc    DELETE a user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteProject = async (req, res) => {
	const project = await Project.findById(req.params.id);

	const updatedUsers = User.find({
		projects: mongoose.Types.ObjectId(req.params.id),
	});

	console.log(updatedUsers);

	await project.remove();

	res.json({ success: true });
};
