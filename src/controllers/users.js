const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const { fieldExistsUser, isValidEmail } = require( '../helpers' );

const createUser = async ( input ) => {

	const { username, email, password } = input;

	const newUser = {
		...input,
		email: email.toLowerCase(),
		username: username.toLowerCase(),
	};

	try {

		if ( username.length < 3 ) {
			throw new Error( 'Username must be at least 3 characters' );
		}

		if ( password.length < 6 ) {
			throw new Error( 'Password must be at least 6 characters' );
		}

		if ( !isValidEmail( email ) ) {
			throw new Error( 'Email must be valid' );
		}

		// Validate if the username or email is already registered
		await Promise.all( [
			fieldExistsUser( 'email', newUser.email ),
			fieldExistsUser( 'username', newUser.username )
		] );

		// Create the user
		const user = new User( newUser );

		// Crypt the password
		const salt = bcryptjs.genSaltSync();
		user.password = bcryptjs.hashSync( password, salt );

		// Save the user
		await user.save();

		return user;

	} catch ( error ) {

		console.log( error + '\n' );
		return null;

	}

};

module.exports = {
	createUser
};