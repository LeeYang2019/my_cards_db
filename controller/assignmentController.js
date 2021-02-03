const mongoose = require('mongoose');
const User = require('../model/User');
const Project = require('../model/Project');
const { update } = require('../model/User');

// @desc    assigns user to project
// @route   PUT /api/users/:id/projects/:projectId/assign
exports.assignUserToProject = async (req, res) => {
	console.log('Code entered here');
	const projectId = req.params.projectId;
	const userId = req.params.id;

	const project = await Project.findById(projectId);
	const user = await User.findById(userId);

	//check if exist
	if (user || project) {
		//if user project length === 0
		if (user.projects.length === 0 && project.users.length === 0) {
			console.log('both user projects and project users are empty');
			user.projects.push(projectId);
			project.users.push(userId);
			await user.save();
			await project.save();
			res.status(200).json({ success: true });
		}

		//if user project length > 0
		if (user.projects.length > 0 && project.users.length > 0) {
			console.log('both user projects and project users are not empty');

			if (
				!user.projects.includes(projectId) &&
				!project.users.includes(userId)
			) {
				console.log('user has not been assigned before');
				user.projects.push(projectId);
				project.users.push(userId);
				await user.save();
				await project.save();
				res.status(200).json({ success: true });
			}
		}
	} else {
		res.status(401);
		throw new Error('No Resources Found');
	}
};

// @desc    unassign user from project
// @route   PUT /api/users/:id/projects/:projectId/remove
exports.unassignUserFromProject = async (req, res) => {
	const projectId = req.params.projectId;
	const userId = req.params.id;

	//get user
	const updateUser = await User.findById(req.params.id);

	//find projects with user assigned
	const updatedProjects = await Project.find({
		users: mongoose.Types.ObjectId(req.params.id),
	});

	const { projects } = updateUser;
	projArr = Array.from(projects);
	projArr.forEach((element) => {
		console.log(element);
	});

	res.status(200).json({ success: true });
};
