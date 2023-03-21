const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const likeSchema = new Schema( {
	publication: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Publication',
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	}
}, {
	timestamps: true,
} );

const Like = mongoose.models.Like || mongoose.model( 'Like', likeSchema );

module.exports = Like;