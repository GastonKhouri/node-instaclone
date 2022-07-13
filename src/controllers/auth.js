const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const { generateJWT } = require( '../helpers' );

const login = async ( input ) => {

	const { email, password } = input;

	try {

		const user = await User.findOne( { email: email.toLowerCase() } );

		// Verify if the user exists
		if ( !user ) {
			throw new Error( 'Incorrect email or password' );
		}

		// Verify if the password is correct
		const validPassword = bcryptjs.compareSync( password, user.password );

		if ( !validPassword ) {
			throw new Error( 'Incorrect email or password' );
		}

		// Generate the token
		const token = await generateJWT( user.id );

		return {
			token
		};

	} catch ( error ) {

		console.log( error + '\n' );
		return null;

	}

};

module.exports = {
	login
};