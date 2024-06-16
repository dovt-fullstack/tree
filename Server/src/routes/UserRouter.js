// routes/user.js

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Đăng ký người dùng
router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
