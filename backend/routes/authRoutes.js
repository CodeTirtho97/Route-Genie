const express = require("express");
const { check } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Signup Route
router.post("/signup", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6+ characters").isLength({ min: 6 }),
    check("dob", "Date of birth is required").not().isEmpty(),
    check("gender", "Gender is required").not().isEmpty()
], signup);

// Login Route
router.post("/login", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
], login);

module.exports = router;
