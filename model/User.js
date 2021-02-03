const mongoose = require('mongoose');
const Project = require('./Project');

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	age: {
		type: Number,
	},
	projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

module.exports = mongoose.model('User', userSchema);
