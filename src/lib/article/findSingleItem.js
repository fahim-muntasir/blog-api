const { Article } = require("../../models");
const { notFoundError } = require("../../utils/error");

const findSingleItem = async (id) => {
  try {
    const article = await Article.findById(id).populate(
      "authors",
      "name email"
    );

    if (!article) {
      throw notFoundError("Article not found!");
    }
    
    return article;
  } catch (error) {
    throw error;
  }
};

module.exports = findSingleItem;
