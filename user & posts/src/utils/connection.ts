import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();     
  
try {  
  mongoose.connect(process.env.mongoUrl);
  console.log("MongoDb Successfuly connected!");
} catch (error: unknown) {
  console.log("Mongo Error : Error Occured!");   
} 
                             