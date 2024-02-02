const { User } = require("../../models");
const { notFoundError } = require("../../utils/error");

const checkOwnerShip = async ({ resourceId = "", userId = "" }) => {
  try {
    const user = await User.findById(resourceId);

    if (!user) {
      throw notFoundError();
    }

    if (user._id.toString() === userId) {

      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = checkOwnerShip;
