const Follow = require( '../models/follow' );
const User = require( '../models/user' );

const followUser = async ( username, { user } ) => {

	if ( !user ) {
		throw new Error( 'You must be logged in to follow a user.' );
	}

	const userToFollow = await User.findOne( {
		username: username.toLowerCase().trim()
	} ).lean();

	if ( !userToFollow ) {
		throw new Error( 'User to follow not found.' );
	}

	const alreadyFollowing = await Follow.findOne( {
		follower: user._id,
		following: userToFollow._id
	} )
		.lean();

	if ( alreadyFollowing ) {
		throw new Error( 'You are already following this user.' );
	}

	try {

		const follow = new Follow( {
			follower: user._id,
			following: userToFollow._id
		} );

		await follow.save();

		return true;

	} catch ( error ) {

		return false;

	}

};

const unfollowUser = async ( username, { user } ) => {

	if ( !user ) {
		throw new Error( 'You must be logged in to unfollow a user.' );
	}

	const userToUnfollow = await User.findOne( {
		username: username.toLowerCase().trim()
	} ).lean();

	if ( !userToUnfollow ) {
		throw new Error( 'User to follow not found.' );
	}

	const alreadyFollowing = await Follow.findOne( {
		follower: user._id,
		following: userToUnfollow._id
	} );

	if ( !alreadyFollowing ) {
		throw new Error( 'You are not following this user.' );
	}

	try {

		await alreadyFollowing.remove();

		return true;

	} catch ( error ) {

		return false;

	}

};

const isFollowing = async ( username, { user } ) => {

	if ( !user ) {
		throw new Error( 'You must be logged in.' );
	}

	const userToFollow = await User.findOne( {
		username: username.toLowerCase().trim()
	} ).lean();

	if ( !userToFollow ) {
		throw new Error( 'User to follow not found.' );
	}

	const alreadyFollowing = await Follow.findOne( {
		follower: user._id,
		following: userToFollow._id
	} )
		.lean();

	if ( !alreadyFollowing ) return false;

	return true;

};

const getFollowers = async ( username ) => {

	const user = await User.findOne( {
		username: username.toLowerCase().trim()
	} ).lean();

	if ( !user ) {
		throw new Error( 'User not found.' );
	}

	const followers = await Follow.find( { following: user._id } )
		.populate( 'follower' )
		.lean();

	return followers.map( ( { follower } ) => ( { ...follower, id: follower._id } ) );

};

const getFollowing = async ( username ) => {

	const user = await User.findOne( {
		username: username.toLowerCase().trim()
	} ).lean();

	if ( !user ) {
		throw new Error( 'User not found.' );
	}

	const following = await Follow.find( { follower: user._id } )
		.populate( 'following' )
		.lean();

	return following.map( ( { following } ) => ( { ...following, id: following._id } ) );

};

const getNotFollowing = async ( { user } ) => {

	if ( !user ) {
		throw new Error( 'You must be logged in.' );
	}

	const users = await User.find().lean();

	const usersNotFollowing = [];

	for await ( const userDb of users ) {

		const alreadyFollowing = await Follow.findOne( {
			follower: user._id,
			following: userDb._id
		} );

		if ( !alreadyFollowing && userDb._id.toString() !== user._id.toString() ) {
			usersNotFollowing.push( userDb );
		}

	}

	return usersNotFollowing.map( ( user ) => ( { ...user, id: user._id } ) );

};

module.exports = {
	followUser,
	isFollowing,
	unfollowUser,
	getFollowers,
	getFollowing,
	getNotFollowing
};