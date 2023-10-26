const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require('cors');
const errorMiddleware = require('./middlewares/error');

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Custom-Header'],
  }));
  
app.use(express.json());
app.use(cookieParser());


// Routes Import
const user = require('./routes/userRoute');
const openAi = require('./routes/openAIRoute');

// Routes Use
app.use("/api/v1",user);
app.use("/api/v1",openAi)

// middleware for errors
app.use(errorMiddleware)

module.exports = app;