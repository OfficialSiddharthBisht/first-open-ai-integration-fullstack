const express =require('express');
const {
    loginUser,
    registerUser,
    getUserDetails,
    logout} = require('../controllers/userController');
const {isAuthenticatedUser} = require('../middlewares/auth');
const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout)

router.route("/me").get(isAuthenticatedUser,getUserDetails);


module.exports = router;