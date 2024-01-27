const {User} = require("../../models");

const create = async ({name, email, password, role = "user"}) => {
  try {
    const user = await User.create({
      name,
      email,
      password,
      role
    })
  
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = create;