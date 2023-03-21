const express = require( 'express' );
const { ApolloServer } = require( 'apollo-server-express' );
const graphqlUploadExpress = require( 'graphql-upload/graphqlUploadExpress.js' );

const { dbConnection } = require( '../database/config' );
const { typeDefs, resolvers, context } = require( '../gql' );

class Server {

	constructor() {

		this.app = express();
		this.port = process.env.PORT || '8080';

		// Create Apollo Server
		this.apolloServer = new ApolloServer( {
			typeDefs,
			resolvers,
			context
		} );

		// Connect to DB
		this.connectDB();

	}

	middlewares() {

		// Upload files
		this.app.use( graphqlUploadExpress() );

		// Add middlewares
		this.apolloServer.applyMiddleware( { app: this.app } );

	}

	async connectDB() {

		await dbConnection();

	}

	async initialSetup() {

		await this.apolloServer.start();

	}

	async listen() {

		await this.apolloServer.start();

		this.middlewares();

		this.app.listen( this.port, () => {

			console.log( `Server ready at http://localhost:${ this.port }${ this.apolloServer.graphqlPath }` );

		} );


	}

}

module.exports = Server;