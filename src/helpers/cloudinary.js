const cloudinary = require( 'cloudinary' ).v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const uploadFileToCloudinary = ( createReadStream ) => new Promise( ( resolve, reject ) => {

	createReadStream().pipe(
		cloudinary.uploader.upload_stream( ( error, result ) => {
			if ( error ) {
				reject( error );
			}
			resolve( result );
		} )
	);

} );

const deleteFileFromCloudinary = ( url ) => {

	if ( url ) {
		const arrName = url.split( '/' );
		const name = arrName[ arrName.length - 1 ];
		const [ public_id ] = name.split( '.' );
		cloudinary.uploader.destroy( public_id );
	}

};

module.exports = {
	uploadFileToCloudinary,
	deleteFileFromCloudinary
};