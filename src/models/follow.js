const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const followSchema = new Schema( {
	follower: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	following: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
}, {
	timestamps: true,
} );

const Follow = mongoose.models.Follow || mongoose.model( 'Follow', followSchema );

module.exports = Follow;