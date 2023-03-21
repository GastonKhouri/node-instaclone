const auth = require( './auth' );
const follows = require( './follows' );
const users = require( './users' );
const publications = require( './publications' );
const comments = require( './comments' );
const likes = require( './likes' );

module.exports = {
	...auth,
	...follows,
	...users,
	...publications,
	...comments,
	...likes
};
