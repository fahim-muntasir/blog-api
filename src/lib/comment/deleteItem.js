const { Comment } = require("../../models");

const deleteItem = async (id) => {
  try {
    const deletedItem = await Comment.findByIdAndDelete(id)
      .populate("authors", "name email")
      .populate("article", "title");

    if (!deletedItem) {
      const error = new Error("Resources not found!");
      error.status = 404;

      throw error;
    }

    return deletedItem;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteItem;
