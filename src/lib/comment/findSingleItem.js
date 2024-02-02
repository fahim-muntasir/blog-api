const { Comment } = require("../../models");
const { notFoundError } = require("../../utils/error");

const findSingleItem = async (id) => {
  try {
    const comment = await Comment.findById(id)
      .populate("authors", "name email")
      .populate("article", "title");

    if (!comment) {
      throw notFoundError("Comment not found!");
    }

    return comment;
  } catch (error) {
    throw error;
  }
};

module.exports = findSingleItem;
