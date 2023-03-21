const { validateUpload, uploadFileToCloudinary } = require( '../helpers' );

const Publication = require( '../models/publication' );
const Follow = require( '../models/follow' );
const User = require( '../models/user' );

const postPublication = async ( file, { user } ) => {

	const { createReadStream, type } = await validateUpload( user, file );

	try {

		// Subir imagen a cloudinary
		const { secure_url } = await uploadFileToCloudinary( createReadStream );

		// Crear publicación
		const publication = new Publication( {
			user: user.id,
			file: secure_url,
			fileType: type,
		} );

		// Guardar publicación
		await publication.save();

		return {
			status: true,
			fileUrl: secure_url,
		};

	} catch ( error ) {

		return {
			status: false,
			fileUrl: null,
		};

	}

};

const getPublications = async ( username ) => {

	const user = await User.findOne( {
		username: username.toLowerCase().trim()
	} ).lean();

	if ( !user ) {
		throw new Error( 'User not found.' );
	}

	const publications = await Publication.find( {
		user: user._id
	} )
		.populate( 'user' )
		.sort( { createdAt: -1 } )
		.lean();

	return publications.map( publication => ( {
		...publication,
		id: publication._id,
		user: {
			...publication.user,
			id: publication.user._id,
		}
	} ) );

};

const getPublicationsFollowed = async ( { user } ) => {

	if ( !user ) {
		throw new Error( `User need to be logged in to do this.` );
	};

	const following = await Follow.find( { follower: user._id } )
		.select( 'following' )
		.lean();

	const usersFollowing = following.map( ( { following } ) => following.toString() );

	const publications = await Publication.find( {
		user: { $in: usersFollowing }
	} )
		.populate( 'user' )
		.sort( { createdAt: -1 } )
		.lean();

	return publications.map( publication => ( {
		...publication,
		id: publication._id,
		user: {
			...publication.user,
			id: publication.user._id,
		}
	} ) );

};


module.exports = {
	postPublication,
	getPublications,
	getPublicationsFollowed
};