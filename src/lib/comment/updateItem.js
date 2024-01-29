const { Comment } = require("../../models");

const updateItem = async ({ data = {}, id }) => {
  try {
    const comment = await Comment.findById(id)
      .populate("authors", "name email")
      .populate("article", "title");

    comment.text = data.text || comment.text;

    const updatedComment = await comment.save();

    return updatedComment;
  } catch (error) {
    throw error;
  }
};

module.exports = updateItem;
