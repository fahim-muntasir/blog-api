const { User } = require("../../models");
const { notFoundError } = require("../../utils/error");

const deleteItem = async (id) => {
  try {
    const deletedItem = await User.findByIdAndDelete(id);
    
    if (!deletedItem) {
      throw notFoundError("User not found!");
    }
    
    return deletedItem;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteItem;
