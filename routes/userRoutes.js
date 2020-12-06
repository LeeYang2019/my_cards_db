const express = require('express');
const router = express.Router();

const {
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
	assignUserToProject,
} = require('../controller/userController');

router.route('/').get(getUsers).post(addUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.route('/:id/projects/:projectId').put(assignUserToProject);

module.exports = router;
