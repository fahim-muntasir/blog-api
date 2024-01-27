const { User } = require("../../models");

const findSingleItem = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = findSingleItem;
