const jwt = require( 'jsonwebtoken' );

const generateJWT = ( uid = '', expiresIn = '48h' ) => {

	return new Promise( ( resolve, reject ) => {

		const payload = { uid };

		jwt.sign( payload, process.env.JWT_SECRET_SEED, {
			expiresIn
		}, ( err, token ) => {

			if ( err ) {
				console.log( err );
				reject( 'JWT could not be generated' );
			} else {
				resolve( token );
			}

		} );

	} );

};

module.exports = {
	generateJWT
};