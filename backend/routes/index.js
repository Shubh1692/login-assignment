const express = require("express");
const path = require("path");
const router = express.Router(),
	userController = require("./user");
/* GET home page. */
router.get("/", (req, res) => {
	res.render("index", { title: "Express" });
});
router.use("/user", userController);

router.get("/error.log", (req, res) => {
	res.sendFile(path.join(__dirname, "../error.log"));
});

module.exports = router;