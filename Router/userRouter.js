const express = require("express");
const { signUp, signIn, getUser } = require("../Controller/user.controller");
const router = express.Router();

router.get("/", getUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
