// This code is for v4 of the openai package: npmjs.com/package/openai
const OpenAI = require("openai");
const dotenv = require("dotenv");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../modals/userModel");
dotenv.config({ path: "./config/config.env" });


console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.openAi = catchAsyncErrors(async (req, res, bext) => {
  // const user = await User.findById(req.user.id);
  // if (user) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "generate a motivational quote",
        },
      ],
      temperature: 1,
      max_tokens: 25,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({
      success:true,
      message:response.choices[0].message.content,
    })
    console.log(response.choices[0].message.content);
  // }
});