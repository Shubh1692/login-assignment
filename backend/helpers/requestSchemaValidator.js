(function () {
	const { body } = require("express-validator");

	const registerUserRequestSchema = [body("firstName").isLength({ min: 1 }).trim(),
	body("lastName").optional({ checkFalsy: true }).isLength({ min: 1 }).trim(),
	body("email").isEmail().isLength({ min: 1 }).trim(),
	body("password").isString({ min: 6 }),
	body("provider").optional({ checkFalsy: true }).isString({ min: 1 })];

	const loginUserRequestSchema = [
		body("email").isEmail().isLength({ min: 1 }).trim(),
		body("password").isString({ min: 6 })];

	const forgetPasswordSchema = [body("email").isEmail().isLength({ min: 1 }).trim()];

	const resetPasswordSchema = [body("password").isString().isLength({ min: 6 }),
	body("token").isString().isLength({ min: 6 })];

	module.exports = {
		registerUserRequestSchema,
		loginUserRequestSchema,
		forgetPasswordSchema,
		resetPasswordSchema
	};
}());