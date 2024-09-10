import express from 'express';
import user from './routes/user.js';
import chat from "./routes/chat.js";
import dotenv from 'dotenv';
import {connectDB} from "./utils/features.js";
import {errorMiddleware} from "./middlewares/error.js";
import cookieParser from "cookie-parser";
// import bodyparser from "body-parser";
import {createUser} from "./seeders/user.js";
import bodyParser from "body-parser";
dotenv.config({
    path:"./.env"
})

const MongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT;
const app = express();
connectDB(MongoUri);


// createUser(10);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());



app.use("/api/user",user);
app.use("/api/chat",chat);



app.get("/",(req,res)=>{
    res.send("Hello World");
});


app.use(errorMiddleware);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})