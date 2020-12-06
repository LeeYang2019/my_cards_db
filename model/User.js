const mongoose = require('mongoose');
const Project = require('./Project');

const userSchema = mongoose.Schema({
	name: {
		type: String,
	},
	projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

module.exports = mongoose.model('User', userSchema);
