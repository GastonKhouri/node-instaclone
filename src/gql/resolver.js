const GraphQLUpload = require( 'graphql-upload/GraphQLUpload.js' );

const {
	postUser, getUser, putUser, searchUsers, updateAvatar, deleteAvatar,
	followUser, isFollowing, unfollowUser, getFollowers, getFollowing, getNotFollowing,
	postPublication, getPublications, getPublicationsFollowed,
	postComment, getComments,
	getLikes, deleteLike, postLike, isLiked,
	login, renew,
} = require( '../controllers' );

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		// User
		getUser: ( _, { id, username } ) => getUser( id, username ),
		searchUsers: ( _, { query } ) => searchUsers( query ),

		// Auth
		renew: ( _, { }, context ) => renew( context ),

		// Follow
		isFollowing: ( _, { username }, context ) => isFollowing( username, context ),
		getFollowers: ( _, { username } ) => getFollowers( username ),
		getFollowing: ( _, { username } ) => getFollowing( username ),
		getNotFollowing: ( _, { }, context ) => getNotFollowing( context ),

		// Publication
		getPublications: ( _, { username } ) => getPublications( username ),
		getPublicationsFollowed: ( _, { }, context ) => getPublicationsFollowed( context ),

		// Comment
		getComments: ( _, { publication } ) => getComments( publication ),

		// Like
		isLiked: ( _, { publication }, context ) => isLiked( publication, context ),
		getLikes: ( _, { publication } ) => getLikes( publication ),
	},
	Mutation: {
		// User
		register: ( _, { input } ) => postUser( input ),
		updateUser: ( _, { input }, context ) => putUser( input, context ),
		updateAvatar: ( _, { file }, context ) => updateAvatar( file, context ),
		deleteAvatar: ( _, { }, context ) => deleteAvatar( context ),

		// Auth
		login: ( _, { input } ) => login( input ),

		// Follow
		follow: ( _, { username }, context ) => followUser( username, context ),
		unfollow: ( _, { username }, context ) => unfollowUser( username, context ),

		// Publication
		postPublication: ( _, { file }, context ) => postPublication( file, context ),

		// Comment
		postComment: ( _, { input }, context ) => postComment( input, context ),

		// Like
		postLike: ( _, { publication }, context ) => postLike( publication, context ),
		deleteLike: ( _, { publication }, context ) => deleteLike( publication, context ),
	}
};

module.exports = resolvers;