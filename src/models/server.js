const { ApolloServer } = require( 'apollo-server' );

const { dbConnection } = require( '../database/config' );
const { typeDefs, resolvers } = require( '../gql' );

class Server {

	constructor() {

		// Set port
		this.port = process.env.PORT || '8080';

		// Create Apollo Server
		this.apolloServer = new ApolloServer( {
			typeDefs,
			resolvers,
		} );

		// Connect to DB
		dbConnection();

	}

	async connectDB() {

		await dbConnection();

	}

	async listen() {

		const { url } = await this.apolloServer.listen( { port: this.port } );

		console.log( `Server ready at ${ url }` );

	}

}

module.exports = Server;