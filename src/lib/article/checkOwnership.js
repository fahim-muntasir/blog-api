const { Article } = require("../../models");
const { notFoundError } = require("../../utils/error");

const checkOwnerShip = async ({ resourceId = "", userId = "" }) => {
  try {
    const article = await Article.findById(resourceId);

    if (!article) {
      throw notFoundError();
    }

    if (article.authors._id.toString() === userId) {

      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = checkOwnerShip;
