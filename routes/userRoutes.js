const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  getUserByEmail,
  updateUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/get/:id", getUserById);
router.get("/user/:email", getUserByEmail);
router.patch("/user/:email", updateUser);
module.exports = router;
