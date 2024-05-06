const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true, maxLength: [32, "panjang kategori maksimal 32 huruf"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
