const { Article } = require("../../models");

const findSingleItem = async (id) => {
  try {
    const article = await Article.findById(id).populate(
      "authors",
      "name email"
    );

    if (!article) {
      const error = new Error("Resources not found!");
      error.status = 404;

      throw error;
    }
    
    return article;
  } catch (error) {
    throw error;
  }
};

module.exports = findSingleItem;
