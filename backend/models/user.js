(function () {
	const {
		Schema,
		model
	} = require("mongoose");
	const bcrypt = require('bcrypt');
	const mongoosePaginate = require("mongoose-paginate"),
		uniqueValidator = require("mongoose-unique-validator");
	const UserSchema = new Schema({
		firstName: {
			type: String,
			required: [true, "First name is Require"]
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "email is Require"],
			unique: true
		},
		provider: {
			type: String,
			default: 'local'
		},
		password: {
			type: String,
			required: [true, "email is Require"]
		}
	}, { timestamps: true, });
	UserSchema.plugin(mongoosePaginate);
	UserSchema.index({ email: 1 });
	UserSchema.index({ updatedAt: 1 });
	UserSchema.plugin(uniqueValidator, {
		message: "{PATH} must be unique"
	});
	UserSchema.pre(
		'create',
		async function (next) {
			const hash = await bcrypt.hash(this.password, 10);
			this.password = hash;
			next();
		}
	);

	UserSchema.methods.isValidPassword = async function (password) {
		const user = this;
		const compare = await bcrypt.compare(password, user.password);
		return compare;
	}

	UserSchema.methods.resetPassword = async function (password) {
		const hash = await bcrypt.hash(password, 10);
		this.password = hash;
		return hash;
	}
	module.exports = model("users", UserSchema);
})();