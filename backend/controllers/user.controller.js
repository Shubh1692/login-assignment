(function () {
	const
		{ validationErrorWithData } = require("../helpers/apiResponse"),
		{ validationResult } = require("express-validator"),
		{ registerUserRequestSchema, loginUserRequestSchema, forgetPasswordSchema, resetPasswordSchema } = require("../helpers/requestSchemaValidator"),
		{ passport } = require('../services/auth.service'),
		jwt = require('jsonwebtoken'),
		{ sendMail } = require('./nodemailer.controller'),
		{ APP_DOMAIN, FORGET_PASSWORD_MAIL } = require('../config'),
		UserModel = require('../models/user');
	const registerUser = [...registerUserRequestSchema, async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return validationErrorWithData(req, res, "Validation Error.", errors.array());
			}
			next();
		} catch (error) {
			validationErrorWithData(req, res, "Data is missing", error);
		}
	}, async (req, res, next) => {
		passport.authenticate(
			'signup',
			async (error, user, info) => {
				try {
					if (error || !user) {
						return validationErrorWithData(req, res, error.message, error);
					}
					req.login(
						user,
						{ session: false },
						async (error) => {
							if (error) return validationErrorWithData(req, res, error.message, error);
							const body = { _id: user._id, email: user.email };
							const token = jwt.sign({ user: body }, 'TOP_SECRET');
							return res.status(200).json({
								status: 200,
								data: {
									token, ...user._doc
								},
								message: 'Register Successfully.',
								success: true
							});
						}
					);
				} catch (error) {
					return validationErrorWithData(req, res, error.message, error);
				}
			}
		)(req, res, next);
	}];

	const loginUser = [...loginUserRequestSchema, async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return validationErrorWithData(req, res, "Validation Error.", errors.array());
			}
			next();
		} catch (error) {
			validationErrorWithData(req, res, "Data is missing", error);
		}
	}, async (req, res, next) => {
		passport.authenticate(
			'login',
			async (error, user, info) => {
				try {
					if (error || !user) {
						return validationErrorWithData(req, res, error.message, error);
					}
					req.login(
						user,
						{ session: false },
						async (error) => {
							if (error) return validationErrorWithData(req, res, error.message, error);
							const body = { _id: user._id, email: user.email };
							const token = jwt.sign({ user: body }, 'TOP_SECRET');
							return res.status(200).json({
								status: 200,
								data: {
									token, ...user._doc
								},
								message: 'Login Successfully.',
								success: true
							});
						}
					);
				} catch (error) {
					return validationErrorWithData(req, res, error.message, error);
				}
			}
		)(req, res, next);
	}];

	const getUser = [passport.authenticate('jwt', { session: false }), async (req, res, next) => {
		return res.status(200).json({
			data: req.user,
			status: 200,
			success: true
		});
	}];

	const forgetPassword = [forgetPasswordSchema, async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return validationErrorWithData(req, res, "Validation Error.", errors.array());
		}
		const { email } = req.body;
		UserModel.findOne({ 'email': email }).exec(async (error, user) => {
			if (error) {
				return validationErrorWithData(req, res, error.message, error);
			}
			if (!user) {
				return validationErrorWithData(req, res, 'User is not exist', {
					message: 'User is not exist'
				});
			}
			const token = jwt.sign({ _id: user._id }, 'TOP_SECRET');
			let forgetPasswordMail = FORGET_PASSWORD_MAIL;
			forgetPasswordMail = forgetPasswordMail.replace('{{APP_DOMAIN}}', APP_DOMAIN);
			forgetPasswordMail = forgetPasswordMail.replace('{{token}}', token)
			const mailInfo = await sendMail({
				to: email,
				subject: 'Please reset your password using link',
				html: forgetPasswordMail
			})
			return res.status(200).json({
				message: 'Mail send successfully',
				data: {
					messageId: mailInfo.messageId,
				},
				status: 200,
				success: true
			});
		});
	}];


	const resetPassword = [resetPasswordSchema, async (req, res) => {
		const { token, password } = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return validationErrorWithData(req, res, "Validation Error.", errors.array());
		}
		try {
			const { _id } = await jwt.verify(token, 'TOP_SECRET');
			UserModel.findById(_id).exec(async (error, user) => {
				if (error) {
					return validationErrorWithData(req, res, error.message, error);
				}
				if (!user) {
					return validationErrorWithData(req, res, 'User is not exist', {
						message: 'User is not exist'
					});
				}
				await user.resetPassword(password);
				await user.save();
				return res.status(200).json({
					message: 'Password reset successfully',
					data: user,
					status: 200,
					success: true
				});
			})
		} catch (error) {
			return validationErrorWithData(req, res, error.message, error);
		}
	}]
	module.exports = {
		registerUser,
		loginUser,
		getUser,
		forgetPassword,
		resetPassword
	};
})();