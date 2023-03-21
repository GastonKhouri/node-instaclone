const { validateJWT } = require( '../helpers' );

const context = async ( { req } ) => {

	const token = req.headers[ 'x-token' ] || '';

	if ( !token ) return;

	try {

		const user = await validateJWT( token );
		return { user };

	} catch ( error ) {

		// console.log( error );
		return;

	}

};

module.exports = context;