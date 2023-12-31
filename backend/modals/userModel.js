const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [50, "Cannot exceed 50 characters"],
        minLength: [2, "Name should have more then 2 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exhists"],
        validate: [validator.isEmail, "Please enter valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be more then 8 characters for security purpose"],
        select: false, // when using find method in mongoose password will not be shown
    }
});

userSchema.pre("save", async function (next) {
    // if we have already changed the password then the field will be already encrypted
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 8);
})

// Jwt Token
userSchema.methods.getJWTToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);