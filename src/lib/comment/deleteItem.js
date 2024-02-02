const { Comment } = require("../../models");
const { notFoundError } = require("../../utils/error");

const deleteItem = async (id) => {
  try {
    const deletedItem = await Comment.findByIdAndDelete(id)
      .populate("authors", "name email")
      .populate("article", "title");

    if (!deletedItem) {
      throw notFoundError("Comment not found!");
    }

    return deletedItem;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteItem;
