import React from 'react';
import mongoose from 'mongoose';
import User from './User';

const projectSchema = mongoose.Schema({
	projectName: {
		type: String,
	},
	users: [User],
});

export default Project = mongoose.model('Project', projectSchema);
