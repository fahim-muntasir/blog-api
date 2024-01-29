const { Schema, model, Types } = require("mongoose");

const articleSchema = new Schema(
  {
    authors: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters long"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
    avatar: String,
    status: {
      type: String,
      enum: {
        values: ["pending", "draft", "active"],
        message: "Invalid status type",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

const Article = model("Article", articleSchema);

module.exports = Article;
