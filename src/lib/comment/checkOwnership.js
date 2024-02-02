const { Comment } = require("../../models");
const { notFoundError } = require("../../utils/error");

const checkOwnerShip = async ({ resourceId = "", userId = "" }) => {
  try {
    const comment = await Comment.findById(resourceId);

    if (!comment) {
      throw notFoundError();
    }

    if (comment.authors._id.toString() === userId) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = checkOwnerShip;
