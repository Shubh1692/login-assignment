(function () {
	const express = require("express"),
		logger = require("morgan"),
		fs = require("fs"),
		indexRouter = require("./routes/index"),
		{ notFoundResponse, unauthorizedResponse } = require("./helpers/apiResponse"),
		cors = require("cors"),
		dbConnections = require("./config/database").dbConnections,
		swaggerJSDoc = require("swagger-jsdoc"),
		swaggerOptions = require("./config/swaggerDef"),
		swaggerUi = require("swagger-ui-express"),
		path = require("path"),
		// Express app instance
		app = express();
	const swaggerSpec = swaggerJSDoc(swaggerOptions);
	dbConnections();
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	logger(":method :url :status :res[content-length] - :response-time ms");
	app.use(logger("combined", {
		format: "POST body length in bytes :req[Content-Length]",
		skip: (req, res) => { return res.statusCode < 400; },
		stream: fs.createWriteStream(path.join(__dirname, "error.log"), { flags: "a" }),
	}));
	//To allow cross-origin requests
	app.use(cors());
	app.use("/api", indexRouter);
	app.get("/api-docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.use(express.static(`${__dirname.replace('backend', '')}/build/`));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(`${__dirname.replace('backend', '')}/build/index.html`));
	});
	app.use((err, req, res) => {
		if (err.name == "UnauthorizedError") {
			return unauthorizedResponse(res, err.message);
		}
	});
	module.exports = app;
}());
