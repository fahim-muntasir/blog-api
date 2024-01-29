const { Article } = require("../../models");

const findAllItems = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortType = "desc",
  searchQuery = "",
  status = "",
}) => {
  try {
    const sortFilter = { [sortBy]: sortType === "desc" ? -1 : 1 };

    // Create a search condition based on the title or body
    const searchCondition = searchQuery
      ? {
          $and: [
            {
              $or: [
                { title: { $regex: new RegExp(searchQuery, "i") } },
                { body: { $regex: new RegExp(searchQuery, "i") } },
              ],
            },
            status ? { status } : {},
          ],
        }
      : status
      ? { status }
      : {};

    // Use the search condition in the query
    const data = await Article.find(searchCondition)
      .sort(sortFilter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("authors", "name email");

    // Fetch total count of documents with the search condition
    const totalItems = await Article.countDocuments(searchCondition);

    return { data: data.map((article) => article._doc), totalItems };
  } catch (error) {
    throw error;
  }
};

module.exports = findAllItems;
