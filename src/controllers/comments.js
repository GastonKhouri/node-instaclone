const Comment = require( '../models/comment' );
const Publication = require( '../models/publication' );

const postComment = async ( input, { user } ) => {

	if ( !user ) {
		throw new Error( 'You must be logged in to comment.' );
	}

	const { publication, comment } = input;

	const publicationToComment = await Publication.findById( publication ).lean();

	if ( !publicationToComment ) {
		throw new Error( 'Publication to comment not found.' );
	}

	const newComment = new Comment( {
		publication,
		user: user.id,
		text: comment.trim()
	} );

	await newComment.save();

	newComment.id = newComment._id;

	return newComment;

};

const getComments = async ( publication ) => {

	const publicationDb = await Publication.findById( publication ).lean();

	if ( !publicationDb ) {
		throw new Error( 'Publication not found.' );
	}

	const comments = await Comment.find( { publication } ).populate( 'user' ).lean();

	return comments.map( comment => ( {
		...comment,
		id: comment._id,
		user: { ...comment.user, id: comment.user._id }
	} ) );;

};

module.exports = {
	postComment,
	getComments
};