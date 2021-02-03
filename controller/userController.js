const User = require('../model/User');
const mongoose = require('mongoose');
const Project = require('../model/Project');
const Joi = require('@hapi/joi');
const { NO_USER_FOUND } = require('./messages');

const userSchema = Joi.object().keys({
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional(),
	age: Joi.number().required(),
});

// @desc    GET all users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.json({ success: true, length: users.length, data: users });
	} catch (error) {
		res.status(500).send(error.message);
	}
};

// @desc    GET a user
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate(
			'projects',
			'projectName'
		);

		if (!user) throw new Error('NO_USER_FOUND');

		res.status(200).json({ success: true, data: user });
	} catch (error) {
		if (error.message === 'NO_USER_FOUND') {
			res.status(400).send(error.message);
		} else {
			res.status(500).send(error.message);
		}
	}
};

// @desc    ADD a user
// @route   POST /api/users
// @access  Private
exports.addUser = async (req, res) => {
	try {
		const { value, error } = userSchema.validate(req.body);

		if (error) throw new Error('Invalid');

		const user = await User.create(value);
		res.json({ success: true, data: user });
	} catch (error) {
		if (error.message === 'Invalid') {
			res.status(400).send(error.message);
		} else {
			res.status(500).send(error.message);
		}
	}
};

// @desc    UPDATE a user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = async (req, res) => {
	try {
		//validate user against userSchema
		const {
			value: { firstName, lastName, age },
			error,
		} = userSchema.validate(req.body);

		//if error exists
		if (error) throw new Error('Invalid inputs');

		//find user by id
		const user = await User.findById(req.params.id);

		//if user does not exist
		if (!user) throw new Error('No User Found');

		//update user
		user.firstName = firstName;
		user.lastName = lastName;
		user.age = age;

		//save user and return
		const updatedUser = await user.save();
		res.status(200).json(updatedUser);
	} catch (error) {
		if (
			error.message === 'No User Found' ||
			error.message === 'Invalid inputs'
		) {
			res.status(400).send(error.message);
		} else {
			res.status(500).send(error.message);
		}
	}
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
