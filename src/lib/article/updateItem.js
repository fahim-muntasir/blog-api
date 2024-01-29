const { Article } = require("../../models");

const updateItem = async ({ data = {}, id }) => {
  try {
    const article = await Article.findById(id).populate("authors", "name email");

    article.title = data.title || article.title;
    article.body = data.body || article.body;

    const updatedArticle = await article.save();

    return updatedArticle;
  } catch (error) {
    throw error;
  }
};

module.exports = updateItem;
