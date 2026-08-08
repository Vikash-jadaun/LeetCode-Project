const express=require('express')
const app=express();
require('dotenv').config();
const cookieParser=require('cookie-parser')
const main=require('./config/db')
const authRouter=require('./routes/userAuth');
const redisClient = require('./config/redis');
const problemRouter=require('./routes/problemCreater')
const submitRouter=require("./routes/submit")
const aiRouter=require('./routes/aiChatting')
const videoRouter = require("./routes/videoCreator");
const cors=require('cors')


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://vikash-jadaun--leetcode-project-pied.vercel.app'
  ],
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter)
app.use('/ai',aiRouter);
app.use("/video",videoRouter);

const InitializeConnection=async ()=>{
  try{
    await Promise.all([main(),redisClient.connect()])
    console.log("DB connected");
    app.listen(process.env.PORT,()=>{
      console.log(`App is listing at port number ${process.env.PORT}`)
    })

  }
  catch(err){
      console.log("Error: "+ err);
  }
}


InitializeConnection();