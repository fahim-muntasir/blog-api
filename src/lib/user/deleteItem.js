const { User } = require("../../models");

const deleteItem = async (id) => {
  try {
    const deletedItem = await User.findByIdAndDelete(id);
    
    if (!deletedItem) {
      const error = new Error("Resources not found!");
      error.status = 404;

      throw error;
    }
    
    return deletedItem;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteItem;
