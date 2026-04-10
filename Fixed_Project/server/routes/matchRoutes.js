const express    = require("express");
const router     = express.Router();
const auth       = require("../middleware/auth");
const { findMatch } = require("../controllers/matchController");

// Protected: AI matching makes OpenAI API calls — require login to prevent abuse
router.post("/", auth, findMatch);

module.exports = router;
