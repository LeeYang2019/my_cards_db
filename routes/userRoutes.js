const express = require('express');
const router = express.Router();

const {
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
} = require('../controller/userController');

const {
	assignUserToProject,
	unassignUserFromProject,
} = require('../controller/assignmentController');

router.route('/').get(getUsers).post(addUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/projects/:projectId/assign').put(assignUserToProject);
router.route('/:id/projects/:projectId/remove').put(unassignUserFromProject);

module.exports = router;
