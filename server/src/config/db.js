import mongoose from "mongoose";

// Connect to MongoDB using Mongoose
const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connection established", conn.connection.host);
  } catch (error) {
    console.error("error connecting to database", error.message);
    process.exit(1); // Stop server if DB connection fails
  }
};

export default connectToDB;
