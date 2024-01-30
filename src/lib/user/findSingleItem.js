const { User } = require("../../models");

const findSingleItem = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    throw error;
  }
};

const existUser = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (user) {
      return user;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = { findSingleItem, existUser };
