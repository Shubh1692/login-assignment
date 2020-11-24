const util = require("util"),
	{ errorDebugger } = require("../config/debug");
exports.errorResponse = function (req, res, message) {
	const data = {
		status: 400,
		message,
		success: false
	};
	errorDebugger(`req.url ${req.url} req.method ${req.method} req.body ${req.body ? util.inspect(req.body) : ""}`);
	return res.status(500).json(data);
};

exports.notFoundResponse = function (req, res, message) {
	const data = {
		status: 404,
		message,
		success: false
	};
	errorDebugger(`req.url ${req.url} req.method ${req.method} req.body ${req.body ? util.inspect(req.body) : ""}`);
	return res.status(404).json(data);
};

exports.validationErrorWithData = function (req, res, message, data) {
	const resData = {
		status: 400,
		message,
		data,
		success: false
	};
	errorDebugger(`req.url ${req.url} req.method ${req.method} req.body ${req.body ? util.inspect(req.body) : ""}`);
	return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, message) {
	const data = {
		status: 401,
		message,
	};
	return res.status(401).json(data);
};