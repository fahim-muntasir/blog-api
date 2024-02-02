const { Article } = require("../../models");
const { notFoundError } = require("../../utils/error");

const deleteItem = async (id) => {
  try {
    const deletedItem = await Article.findByIdAndDelete(id).populate(
      "authors",
      "name email"
    );

    if (!deletedItem) {
      throw notFoundError("Article not found!");
    }

    return deletedItem;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteItem;
