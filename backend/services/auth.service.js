(async function () {
	const passport = require('passport');
	const localStrategy = require('passport-local').Strategy,
		JWTStrategy = require('passport-jwt').Strategy,
		ExtractJWT = require('passport-jwt').ExtractJwt;
	const UserModel = require('../models/user');

	passport.use(
		'signup',
		new localStrategy(
			{
				passReqToCallback: true,
				usernameField: 'email',
				passwordField: 'password'
			},
			async (req, email, password, done) => {
				try {
					const { firstName, lastName, provider = 'local' } = req.body;
					const existUser = await UserModel.findOne({ email });
					if (existUser) {
						return done({ message: 'User already exist' }, false);
					}
					const user = await UserModel.create({ email, password, firstName, lastName, provider });
					await user.resetPassword(password);
					user.save();
					return done(null, user);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	passport.use(
		'login',
		new localStrategy(
			{
				usernameField: 'email',
				passwordField: 'password'
			},
			async (email, password, done) => {
				try {
					const user = await UserModel.findOne({ email });
					if (!user) {
						return done({ message: 'User is not exist' }, false);
					}
					const validate = await user.isValidPassword(password);
					if (!validate) {
						return done({ message: 'Wrong Password' }, false);
					}
					return done(null, user, { message: 'Logged in Successfully' });
				} catch (error) {
					return done(error);
				}
			}
		)
	);


	passport.use( new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: 'TOP_SECRET'
	}, (jwtPayload, done) => {
		return UserModel.findById(jwtPayload.user._id)
			.exec((err, user) => {
				if (err)
					return done(err);
				if (!user)
					return done(null, false);
				return done(null, user);
			});
	}));

	passport.serializeUser((user, done) => {
		done(null, {
			id: user.id
		});
	});
	passport.deserializeUser((user, done) => {
		UserModel.findById(user.id).
			exec((err, user) => {
				done(err, user);
			});
	});

	module.exports = {
		passport
	};
}());
