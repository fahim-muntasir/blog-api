const { Comment } = require("../../models");

const findSingleItem = async (id) => {
  try {
    const comment = await Comment.findById(id)
      .populate("authors", "name email")
      .populate("article", "title");

    if (!comment) {
      const error = new Error("Resources not found!");
      error.status = 404;

      throw error;
    }

    return comment;
  } catch (error) {
    throw error;
  }
};

module.exports = findSingleItem;
