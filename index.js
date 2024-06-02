require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", productRoutes);
app.use("/api", userRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
