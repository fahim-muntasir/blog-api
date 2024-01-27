const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema(
  {
    authors: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Author id is required"],
    },
    article: {
      type: Types.ObjectId,
      ref: "Article",
      required: [true, "Article Id is required"],
    },
    text: {
      type: String,
      required: [true, "Comment text is required"],
    },
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

const Comment = model("Comment", commentSchema);

module.exports = Comment;
