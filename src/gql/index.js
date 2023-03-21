const resolvers = require( './resolver' );
const typeDefs = require( './schema' );
const context = require( './context' );

module.exports = {
	typeDefs,
	resolvers,
	context
};