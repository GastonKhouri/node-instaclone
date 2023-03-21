const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const { generateJWT } = require( '../helpers' );

const login = async ( input ) => {

	const { email, password } = input;

	const user = await User.findOne( { email: email.toLowerCase() } ).lean();

	// Verify if the user exists
	if ( !user ) {
		throw new Error( 'Incorrect email or password.' );
	}

	// Verify if the password is correct
	const validPassword = bcryptjs.compareSync( password, user.password );

	if ( !validPassword ) {
		throw new Error( 'Incorrect email or password.' );
	}

	// Generate the token
	const token = await generateJWT( user._id );

	user.id = user._id;

	return {
		token,
		user
	};

};

const renew = async ( { user } ) => {

	if ( !user ) {
		throw new Error( `User doesn't exist or Invalid token.` );
	};

	const newToken = await generateJWT( user._id );

	return {
		user,
		token: newToken
	};

};

module.exports = {
	login,
	renew
};