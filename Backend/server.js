import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'


// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDb();

// API endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);

app.get("/",(req,res)=>{
  res.send("Working...");
});

app.listen(port,(req,res)=>{
  console.log(`http://localhost:4000`);
});
