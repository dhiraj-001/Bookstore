import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// connection with database
const connectdb = async () =>{
  try {
    const connectionString = `${process.env.MONGODB_URI}/${DB_NAME}`;
    // console.log("Connecting to MongoDB with connection string:", connectionString);
    const conntionInstance = await mongoose.connect(connectionString)
    console.log(`MongoDB connected !! DB_HOST : ${conntionInstance.connection.host}` )
  } catch (error) {
    console.log("MongoDB connection error : ", error)
  }
}


export default connectdb;