(async function () {
	/**
     * Module dependencies.
     */
	const { serverDebugger, errorDebugger } = require("./config/debug"),
		http = require("http"),
		fs = require("fs"),
		{ argv } = require("yargs"),
		util = require("util"),
		{ environment = "dev" } = argv,
		copyFile = util.promisify(fs.copyFile);
	await copyFile(`${__dirname}/${environment}.env`, `${__dirname.replace('backend', '')}/.env`);
	require("dotenv").config();
	/**
	* Get port from environment and store in Express.
	*/
	const port = normalizePort(process.env.PORT || "8001"),
		app = require("./app");
	app.set("port", port);

	/**
     * Create HTTP server.
     */

	const server = http.createServer(app);

	/**
     * Listen on provided port, on all network interfaces.
     */

	server.listen(port);
	server.on("error", onError);
	server.on("listening", onListening);

	/**
     * Normalize a port into a number, string, or false.
     */

	function normalizePort(val) {
		const port = parseInt(val, 10);

		if (isNaN(port)) {
			// named pipe
			return val;
		}

		if (port >= 0) {
			// port number
			return port;
		}

		return false;
	}

	/**
     * Event listener for HTTP server "error" event.
     */

	function onError(error) {
		if (error.syscall !== "listen") {
			throw error;
		}

		const bind = typeof port === "string"
			? "Pipe " + port
			: "Port " + port;

		// handle specific listen errors with friendly messages
		switch (error.code) {
		case "EACCES":
			errorDebugger(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			errorDebugger(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
		}
	}

	/**
     * Event listener for HTTP server "listening" event.
     */

	function onListening() {
		const addr = server.address();
		const bind = typeof addr === "string"
			? "pipe " + addr
			: "port " + addr.port;
		serverDebugger("Listening on " + bind);
	}
}());