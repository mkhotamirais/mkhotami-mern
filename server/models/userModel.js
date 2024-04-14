const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, minLength: [3, "minimal panjang username 3 karakter"] },
    email: { type: String, unique: true, required: true, minLength: [8, "minimal panjang email 8 karakter"] },
    password: { type: String, required: true, minLength: [5, "minimal panjang password 5 karakter"] },
    gender: { type: String },
    role: { type: String, default: "user" },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
