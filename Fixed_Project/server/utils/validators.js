const mongoose = require("mongoose");

const isValidEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

// Minimum 4 characters
const isStrongEnoughPassword = (value = "") => String(value).length >= 4;

const isValidObjectId = (value = "") => mongoose.Types.ObjectId.isValid(String(value));

module.exports = { isValidEmail, isStrongEnoughPassword, isValidObjectId };
