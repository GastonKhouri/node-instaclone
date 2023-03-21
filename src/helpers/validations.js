const { fieldExistsUser } = require( './dbValidators' );

const isValidEmail = ( email = '' ) => {

	const match = String( email )
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

	return !!match;
};

const validateUserRegister = async ( { username, password, email } ) => {

	if ( username.length < 3 ) {
		throw new Error( 'Username must be at least 3 characters.' );
	}

	if ( password.length < 6 ) {
		throw new Error( 'Password must be at least 6 characters.' );
	}

	if ( !isValidEmail( email ) ) {
		throw new Error( 'Email must be valid.' );
	}

	// Validate if the username or email is already registered
	await fieldExistsUser( 'email', email );

	await fieldExistsUser( 'username', username );

};

const validateUserUpdate = async ( { newData, newPassword, oldPassword, loggedUser } ) => {

	if ( newPassword && oldPassword ) {

		const validPassword = bcryptjs.compareSync( oldPassword, user.password );

		if ( !validPassword ) {
			throw new Error( `Invalid password.` );
		}

		if ( newPassword.length < 6 ) {
			throw new Error( 'New password must be at least 6 characters.' );
		}

	} else if ( newPassword || oldPassword ) {

		throw new Error( `Old password and new password are required to update the password.` );

	}

	if ( newData.email ) {

		if ( !isValidEmail( newData.email ) ) {
			throw new Error( 'Email must be valid.' );
		}

		if ( newData.email.toLowerCase() !== loggedUser.email ) {
			await fieldExistsUser( 'email', newData.email );
		}

	}

};

module.exports = {
	isValidEmail,
	validateUserRegister,
	validateUserUpdate
};