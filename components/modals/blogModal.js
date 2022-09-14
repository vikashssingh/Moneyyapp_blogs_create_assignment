const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    Title: String,
    Body: String,
    _id: String,
  },
  { timestamps: { createdAt: "cDate", updatedAt: "uDate" } }
);

const blogModel = model("blog", blogSchema);

module.exports = blogModel;
