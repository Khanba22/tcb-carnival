import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    console.log(error);
    console.error(`Error: Failed To connect to Database`);
    // process.exit(1);
  }
};

export default connectDB;
