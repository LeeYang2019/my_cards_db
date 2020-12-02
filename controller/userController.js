import User from '../model/User';

// @desc    GET all users
// @route   GET /api/users
// @access  Private
export const getUsers = async (req, res) => {
	const users = await User.find({});
	res.json(users);
};

// @desc    GET a user
// @route   GET /api/users/:id
// @access  Private
export const getUser = async (req, res) => {
	const user = await User.findbyId(req.params.id);
	res.json(user);
};

// @desc    ADD a user
// @route   POST /api/users
// @access  Private
export const addUser = async (req, res) => {
	await User.create(req.body);
	res.json({ success: true });
};

// @desc    UPDATE a user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res) => {
	let user = req.body;
	user = await User.findbyIdAndUpdate(req.params.id, user);
	res.json(user);
};

// @desc    DELETE a user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = async (req, res) => {
	const user = await User.findAndDelete(req.params.id);
	res.json({ success: true });
};
