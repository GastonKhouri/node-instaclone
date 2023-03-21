const validateUploadExtension = ( extension, validExtensions = [ 'jpg', 'jpeg', 'png' ] ) => {

	if ( !validExtensions.includes( extension ) ) {
		throw new Error( `The extension ${ extension } is not allowed, the valid extensions are: ${ validExtensions.join( ', ' ) }` );
	}

};

const validateUpload = async ( user, file ) => {

	if ( !user ) {
		throw new Error( `User need to be logged in to do this.` );
	};

	if ( !file ) {
		throw new Error( 'No file was uploaded.' );
	}

	const { createReadStream, mimetype } = await file;
	const [ type, extension ] = mimetype.split( '/' );

	validateUploadExtension( extension );

	return {
		createReadStream,
		mimetype,
		type,
		extension,
	};

};

module.exports = {
	validateUpload,
	validateUploadExtension
};