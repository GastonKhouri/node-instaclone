const dbValidators = require( './dbValidators' );
const validations = require( './validations' );
const generateJWT = require( './generateJWT' );
const validateJWT = require( './validateJWT' );
const validateUpload = require( './validateUpload' );
const cloudinary = require( './cloudinary' );

module.exports = {
	...dbValidators,
	...validations,
	...generateJWT,
	...validateJWT,
	...validateUpload,
	...cloudinary
};