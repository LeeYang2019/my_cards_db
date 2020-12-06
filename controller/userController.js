const User = require('../model/User');
const Project = require('../model/Project');

// @desc    GET all users
// @route   GET /api/users
// @access  Private
exports.getUsers = async (req, res) => {
	const users = await User.find({});
	res.json(users);
};

// @desc    GET a user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res) => {
	const user = await User.findById(req.params.id).populate(
		'project',
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
	const user = await User.findByIdAndDelete(req.params.id);
	res.json({ success: true });
};

// @desc    assigns user to project
// @route   PUT /api/users/:userId/projects/:projectId
exports.assignUserToProject = async (req, res) => {
	const project = await Project.findById(req.params.projectId);
	const user = await User.findById(req.params.id);

	console.log(project._id);
	console.log(user._id);

	//check if exist
	if (user || project) {
		if (
			user.projects.length > 0 &&
			user.projects.filter((project) => project._id === req.params.projectId)
		)
			project.users.push(user._id);
		user.projects.push(project._id);
		await project.save();
		await user.save();
		res.json({ success: true });
	} else {
		res.status(401);
		throw new Error('No Resources Found');
	}
};
