const mongoose = require('mongoose');
const User = require('./User');

const projectSchema = mongoose.Schema({
	projectName: {
		type: String,
	},
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Project', projectSchema);
