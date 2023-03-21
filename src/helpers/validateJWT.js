const jwt = require( 'jsonwebtoken' );
const User = require( '../models/user' );

const validateJWT = async ( token ) => {

	try {

		const { uid } = jwt.verify( token, process.env.JWT_SECRET_SEED );

		const user = await User.findById( uid );

		if ( !user ) {
			throw new Error( "User doesn't exists in the database." );
		}

		return user;

	} catch ( error ) {

		throw new Error( error );

	}

};

module.exports = {
	validateJWT
};