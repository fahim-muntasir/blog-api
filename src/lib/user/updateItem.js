const {User} = require("../../models");

const updateItem = async ({data = {}, id}) => {
  try {
    const user = await User.findById(id);

    user.name = data.name || user.name;
    user.email = data.email || user.email;

    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

module.exports = updateItem;