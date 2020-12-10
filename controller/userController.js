const User = require('../model/User');
const mongoose = require('mongoose');
const Project = require('../model/Project');

// @desc    GET all users
// @route   GET /api/users
// @access  Private
exports.getUsers = async (req, res) => {
	const users = await User.find({});
	res.json({ success: true, length: users.length, data: users });
};

// @desc    GET a user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res) => {
	const user = await User.findById(req.params.id).populate(
		'projects',
		'projectName'
	);
	res.json(user);
};

// @desc    ADD a user
// @route   POST /api/users
// @access  Private
exports.addUser = async (req, res) => {
	await User.create(req.body);
	res.json({ success: true });
};

// @desc    UPDATE a user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res) => {
	let user = req.body;
	user = await User.findbyIdAndUpdate(req.params.id, user);
	res.json(user);
};

// @desc    DELETE a user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res) => {
	const user = await User.findById(req.params.id);

	const updatedProjects = await Project.find({
		users: mongoose.Types.ObjectId(req.params.id),
	});

	updatedProjects.forEach(async (project) => {
		const { users } = project;
		const index = users.indexOf(req.params.id);
		users.splice(index, 1);
		await project.save();
	});

	await user.remove();
	res.json({ success: true });
};
