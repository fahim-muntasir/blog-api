const { User } = require("../../models");

const findAllItems = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortType = "desc",
}) => {
  try {
    const sortFilter = { [sortBy]: sortType === "desc" ? -1 : 1 };

    const data = await User.find()
      .sort(sortFilter)
      .skip((page - 1) * limit)
      .limit(limit)

    // Fetch total count of documents
    const totalItems = await User.countDocuments();

    return {data: data.map((user) => user._doc), totalItems};
  } catch (error) {
    throw error;
  }
};

module.exports = findAllItems;
