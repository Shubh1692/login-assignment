(function () {
	const debug = require("debug"),
		{ argv } = require("yargs"),
		{ environment = "dev" } = argv,
		serverDebugger = debug("login-assignment:server"),
		databaseDebugger = debug("login-assignment:database"),
		errorDebugger = debug("login-assignment:error");
	if (environment === "dev") {
		debug.enable("login-assignment:*");
	}
	module.exports = {
		serverDebugger,
		errorDebugger,
		databaseDebugger
	};
}());