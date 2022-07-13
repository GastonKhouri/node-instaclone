const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	avatar: {
		type: String,
		trim: true,
	},
	website: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
}, {
	timestamps: true,
} );

const User = mongoose.models.User || mongoose.model( 'User', userSchema );

module.exports = User;