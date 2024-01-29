const { Article } = require("../../models");

const deleteItem = async (id) => {
  try {
    const deletedItem = await Article.findByIdAndDelete(id).populate(
      "authors",
      "name email"
    );

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
