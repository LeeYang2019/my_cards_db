const mongoose = require('mongoose');
const Project = require('./Project');

const userSchema = mongoose.Schema({
	name: {
		type: String,
	},
	projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

// userSchema.pre('remove', async function (next) {
// 	const updatedProject = await this.model('Project').find({
// 		users: mongoose.Types.ObjectId(this._id),
// 	});
// 	console.log(updatedProject);
// });

module.exports = mongoose.model('User', userSchema);
