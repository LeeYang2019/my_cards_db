import React from 'react';
import mongoose from 'mongoose';
import Project from './Project';

const userSchema = mongoose.Schema({
	name: {
		type: String,
	},
	projects: [Project],
});

export default User = mongoose.model('User', userSchema);
