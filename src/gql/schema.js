const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`

	scalar Upload

	# Types

	type User {
		id:          ID
		name:        String
		username:    String
		email:       String
		avatar:      String
		website:     String
		description: String
		createdAt:   String
		updatedAt:   String
	}

	type AuthPayload {
		token: String
		user:  User
	}

	type UpdateAvatar {
		status:    Boolean
		avatarUrl: String
	}

	type Publication {
		id:        ID
		user:      User
		file:      String
		fileType:  String
		createdAt: String
		updatedAt: String
	}

	type PostPublication {
		status:  Boolean
		fileUrl: String
	}

	type Comment {
		id:          ID
		publication: ID
		text:        String
		user:        User
		createdAt:   String
		updatedAt:   String
	}

	type PublicationLikes {
		users: [User]
		count: Int
	}

	# Inputs

	input RegisterUserInput {
		name:     String!
		username: String!
		email:    String!
		password: String!
	}

	input LoginUserInput {
		email:    String!
		password: String!
	}

	input UpdateUserInput {
		name:        String
		username:    String
		email:       String
		website:     String
		description: String
		oldPassword: String
		newPassword: String
	}

	input CommentInput {
		publication: ID!
		comment:     String!
	}

	type Query {
		# User
		getUser( id: ID, username: String ): User
		searchUsers( query: String ): [User]

		# Auth
		renew: AuthPayload

		# Follow
		isFollowing( username: String! ): Boolean
		getFollowers( username: String! ): [User]
		getFollowing( username: String! ): [User]
		getNotFollowing: [User]

		# Publication
		getPublications( username: String! ): [Publication]
		getPublicationsFollowed: [Publication]

		# Comment
		getComments( publication: ID! ): [Comment]

		# Like
		isLiked( publication: ID! ): Boolean
		getLikes( publication: ID! ): PublicationLikes
	}

	type Mutation {
		# User
		register( input: RegisterUserInput ): AuthPayload
		updateUser( input: UpdateUserInput ): Boolean

		# Auth
		login( input: LoginUserInput ): AuthPayload

		# Uploads
		updateAvatar( file: Upload ): UpdateAvatar
		deleteAvatar: Boolean

		# Follow
		follow( username: String! ): Boolean
		unfollow( username: String! ): Boolean

		# Publication
		postPublication( file: Upload ): PostPublication

		# Comment
		postComment( input: CommentInput ): Comment

		# Like
		postLike( publication: ID! ): Boolean
		deleteLike( publication: ID! ): Boolean
	}
`;

module.exports = typeDefs;