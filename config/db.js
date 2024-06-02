const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  if (!process.env.DATABASE_URL) {
    console.warn(
      "Warning: DATABASE_URL environment variable is not set. Add DATABASE_URL (mongodb url) otherwise Database operations will not be functional."
    );
    return; // Exit function if DATABASE_URL is not set
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
