const express = require("express");
const { createNewUrl, getUrl } = require("../Controller/url.controller");
const router = express.Router();

router.post("/create", createNewUrl).get("/:shortId", getUrl);

module.exports = router;
