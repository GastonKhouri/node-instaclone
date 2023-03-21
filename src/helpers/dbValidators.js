const User = require( '../models/user' );

const fieldExistsUser = async ( field = '', value = '' ) => {

	const query = { [ field ]: value.toLowerCase() };

	const fieldExists = await User.findOne( query );

	if ( fieldExists ) {
		throw new Error( `The ${ field } ${ value } is already registered.` );
	}

};

module.exports = {
	fieldExistsUser
};