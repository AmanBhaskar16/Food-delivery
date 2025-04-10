import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect('mongodb+srv://amanbhaskar16:-UmQtr2nh9GNqMg@cluster0.t7wzn.mongodb.net/food-del').then(() => {
    console.log("✅ Connection successful");
  }).catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
  });
};
