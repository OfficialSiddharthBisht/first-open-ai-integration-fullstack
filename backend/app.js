const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const errorMiddleware = require('./middlewares/error');

app.use(express.json());
app.use(cookieParser());


// Routes Import
const user = require('./routes/userRoute');

// Routes Use
app.use("/api/v1",user);

// middleware for errors
app.use(errorMiddleware)

module.exports = app;