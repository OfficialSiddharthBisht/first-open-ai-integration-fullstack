const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../modals/userModel');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');

// Signup User
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
    })
    sendToken(user,201,res);
})

// Login User 
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email, password} = req.body;
    // checking if we have both email and password
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",500));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    sendToken(user, 200, res);
})

// Logout User 
exports.logout = catchAsyncErrors(async(req,res, next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message:'Logged Out'
    })
})

// Get User Details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
})