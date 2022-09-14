const { Schema, model } = require("mongoose");

const reviewScema = new Schema(
  {
    userId: String,
    description: String,
    _id: String,
  },
  { timestamps: { createdAt: "cDate", updatedAt: "uDate" } }
);

const reviewModal = model("review", reviewScema);

module.exports = reviewModal;
