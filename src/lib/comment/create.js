const { Comment } = require("../../models");

const create = async ({ text = "", article, authors }) => {
  try {
    // Create a new comment
    const newComment = new Comment({
      text,
      article,
      authors,
    });

    // Save the comment
    await newComment.save();

    // Find the saved comment by ID and populate the 'authors' field
    const comment = await Comment.findById(newComment._id)
      .populate("authors", "name email")
      .populate("article", "title");

    return comment;
  } catch (error) {
    throw error;
  }
};

module.exports = create;
