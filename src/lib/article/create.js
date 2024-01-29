const { Article } = require("../../models");

const create = async ({ title = "", body = "", avatar = "", authors }) => {
  try {
    // Create a new article
    const newArticle = new Article({
      title,
      body,
      avatar,
      authors,
    });

    // Save the article
    await newArticle.save();

    // Find the saved article by ID and populate the 'authors' field
    const article = await Article.findById(newArticle._id).populate('authors', "name email");

    return article;
  } catch (error) {
    throw error;
  }
};

module.exports = create;