async function dbConnections() {
	try {
		const { MONGODB_URL } = process.env,
			{ databaseDebugger } = require("../config/debug"),
			{ argv } = require("yargs"),
			{ environment = "dev" } = argv,
			mongoose = require("mongoose");
		await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
		databaseDebugger("Connected to %s", MONGODB_URL);
		databaseDebugger("App is running ... \n");
		databaseDebugger("Press CTRL + C to stop the process. \n");
	} catch (error) {
		const { errorDebugger } = require("../config/debug");
		errorDebugger("Database starting error:", error.message);
		process.exit(1);
	}
}

module.exports = {
	dbConnections
};