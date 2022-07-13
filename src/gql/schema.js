const { gql } = require( 'apollo-server' );

const typeDefs = gql`
	type User {
		id:          ID
		name:        String
		username:    String
		email:       String
		password:    String
		avatar:      String
		website:     String
		description: String
		createdAt:   String
		updatedAt:   String
	}

	type Token {
		token: String
	}

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

	type Query {
		# User
		getUser: User
	}

	type Mutation {
		# User
		register( input: RegisterUserInput ): User
		login( input: LoginUserInput ): Token
	}
`;

module.exports = typeDefs;