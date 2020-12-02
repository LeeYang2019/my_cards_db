const express = require('express');
const router = express.Router();

import {
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
} from '../controller/userController';

router.route('/').get(getUsers).post(addUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
