const { login } = require( '../controllers/auth' );
const { createUser } = require( '../controllers/users' );

const resolvers = {
	Query: {
		// User
		getUser: () => {
			return {
				id: '1',
				name: 'John Doe',
				username: 'jdoe'
			};
		}
	},
	Mutation: {
		// User
		register: ( _, { input } ) => createUser( input ),

		// Auth
		login: ( _, { input } ) => login( input ),
	}
};

module.exports = resolvers;