const express = require('express');
const router = express.Router();

const {
	addProject,
	getProjects,
	updateProject,
	deleteProject,
	getProject,
} = require('../controller/projectController');

router.route('/').get(getProjects).post(addProject);

router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
