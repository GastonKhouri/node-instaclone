const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const commentSchema = new Schema( {
	publication: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Publication'
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	text: {
		type: String,
		trim: true,
		required: true
	}
}, {
	timestamps: true,
} );

const Comment = mongoose.models.Comment || mongoose.model( 'Comment', commentSchema );

module.exports = Comment;