const express = require("express");
const {
    openAi
} = require('../controllers/openAIController')
const {isAuthenticatedUser} = require('../middlewares/auth');
const router = express.Router();

// router.route("/openai").get(isAuthenticatedUser,openAi);
router.route("/openai").get(openAi);


module.exports = router;