import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return handler(req, res);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return;
  }

  return handler(req, res);
};

export default connectDb;
