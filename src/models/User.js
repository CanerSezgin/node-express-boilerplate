const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true },
      validate: {
        validator: (value) => {
          if (value === "") return false;
          if (value) return true;
        },
      },
    },
    hash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Set Schema Name
module.exports = mongoose.model("User", User);
