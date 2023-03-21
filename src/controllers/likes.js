const Like = require( '../models/like' );
const Publication = require( '../models/publication' );

const postLike = async ( publication, { user } ) => {

	if ( !user ) {
		throw new Error( 'You must be logged in to like.' );
	}

	const publicationToLike = await Publication.findById( publication ).lean();

	if ( !publicationToLike ) {
		throw new Error( 'Publication to like not found.' );
	}

	const alreadyLiked = await Like.findOne( {
		user: user.id,
		publication
	} );

	if ( alreadyLiked ) {
		throw new Error( 'You already liked this publication.' );
	}

	try {

		const newLike = new Like( {
			publication,
			user: user.id
		} );

		await newLike.save();

		return true;

	} catch ( error ) {
		return false;
	}


};

const deleteLike = async ( publication, { user } ) => {

	if ( !user ) {
		throw new Error( 'You must be logged in to like.' );
	}

	const publicationToRemoveLike = await Publication.findById( publication ).lean();

	if ( !publicationToRemoveLike ) {
		throw new Error( 'Publication to remove like not found.' );
	}

	const alreadyLiked = await Like.findOne( {
		user: user.id,
		publication
	} );

	if ( !alreadyLiked ) {
		throw new Error( 'You have not liked this post.' );
	}

	try {

		await alreadyLiked.remove();

		return true;

	} catch ( error ) {
		return false;
	}

};

const isLiked = async ( publication, { user } ) => {

	if ( !user ) {
		throw new Error( 'You must be logged in.' );
	}

	const publicationToCheck = await Publication.findById( publication ).lean();

	if ( !publicationToCheck ) {
		throw new Error( 'Publication to check like not found.' );
	}

	const alreadyLiked = await Like.findOne( {
		user: user.id,
		publication
	} ).lean();

	if ( !alreadyLiked ) return false;

	return true;

};

const getLikes = async ( publication ) => {

	const publicationToGetLikes = await Publication.findById( publication ).lean();

	if ( !publicationToGetLikes ) {
		throw new Error( 'Publication to get likes not found.' );
	}

	try {

		const likes = await Like.find( { publication } ).populate( 'user' ).lean();

		const users = likes.map( like => ( {
			...like.user,
			id: like.user._id
		} ) );

		return {
			users,
			count: users.length
		};

	} catch ( error ) {
		return {
			users: [],
			count: 0
		};
	}

};

module.exports = {
	postLike,
	deleteLike,
	getLikes,
	isLiked
};