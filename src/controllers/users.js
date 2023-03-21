const bcryptjs = require( 'bcryptjs' );

const User = require( '../models/user' );

const {
	validateUserRegister,
	generateJWT,
	validateUserUpdate,
	validateUpload,
	uploadFileToCloudinary,
	deleteFileFromCloudinary
} = require( '../helpers' );


const postUser = async ( input ) => {

	const { username, email, password } = input;

	const newUser = {
		...input,
		email: email.toLowerCase(),
		username: username.toLowerCase(),
	};

	// Validate fields
	await validateUserRegister( newUser );

	// Create the user
	const user = new User( newUser );

	// Crypt the password
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync( password, salt );

	// Save the user
	await user.save();
	user.id = user._id;

	// Generate the token
	const token = await generateJWT( user._id );

	return {
		token,
		user,
	};

};

const getUser = async ( id, username ) => {

	let user;

	if ( id ) {
		user = await User.findById( id ).lean();
	}

	if ( username ) {
		user = await User.findOne( { username } ).lean();
	}

	if ( !user ) {
		throw new Error( 'Invalid user id or username' );
	}

	user.id = user._id;

	return user;

};

const putUser = async ( input, { user } ) => {

	if ( !user ) {
		throw new Error( `User need to be logged in.` );
	};

	const { newPassword, oldPassword, ...rest } = input;

	// Validate fields
	await validateUserUpdate( {
		newData: rest,
		loggedUser: user,
		newPassword,
		oldPassword,
	} );

	if ( newPassword && oldPassword ) {

		const salt = bcryptjs.genSaltSync();
		rest.password = bcryptjs.hashSync( newPassword, salt );

	}

	try {

		// Actualizar usuario
		await User.findByIdAndUpdate( user.id, rest );

		return true;

	} catch ( error ) {

		return false;

	}

};

const searchUsers = async ( query ) => {

	if ( !query || query.trim().length === 0 ) {
		throw new Error( 'Query is empty.' );
	}

	let q = query.toString().trim().toLowerCase();

	const regex = new RegExp( q, 'i' );

	const users = await User.find( {
		$or: [
			{ name: regex },
			{ username: regex },
		]
	} ).lean();

	return users;

};

const updateAvatar = async ( file, { user } ) => {

	const { createReadStream } = await validateUpload( user, file );

	try {

		// Borrar imagen de cloudinary si ya tiene una imagen
		deleteFileFromCloudinary( user.avatar );

		// Subir imagen a cloudinary
		const { secure_url } = await uploadFileToCloudinary( createReadStream );

		// Guardar url de imagen en la base de datos
		await User.findByIdAndUpdate( user.id, { avatar: secure_url } );

		return {
			status: true,
			avatarUrl: secure_url,
		};

	} catch ( error ) {

		return {
			status: false,
			avatarUrl: null,
		};

	}

};

const deleteAvatar = async ( { user } ) => {

	if ( !user ) {
		throw new Error( `User need to be logged in.` );
	};

	try {

		// Borrar imagen de cloudinary
		deleteFileFromCloudinary( user.avatar );

		// Eliminar url de la base de datos
		await User.findByIdAndUpdate( user.id, { avatar: "" } );

		return true;

	} catch ( error ) {

		return false;

	}

};

module.exports = {
	postUser,
	getUser,
	putUser,
	searchUsers,
	updateAvatar,
	deleteAvatar,
};