const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  displayPicture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD41FVYIkCGUt1NV9V6FZ1vZx3NdcCK0QQPA&s",
  },
});

module.exports = mongoose.model("User", UserSchema);
