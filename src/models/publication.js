const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const publicationSchema = new Schema( {
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	file: {
		type: String,
		required: true,
		trim: true,
	},
	fileType: {
		type: String,
		required: true,
		trim: true,
	},
}, {
	timestamps: true,
} );

const Publication = mongoose.models.Publication || mongoose.model( 'Publication', publicationSchema );

module.exports = Publication;