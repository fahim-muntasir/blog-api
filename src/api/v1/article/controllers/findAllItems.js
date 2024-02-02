const articleServices = require("../../../../lib/article");
const {
  paginationGenerate,
  generatePaginationLinks,
} = require("../../../../utils/pagination");
const { transfromData } = require("../../../../utils/responseData");

const findAllItems = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const sortType = req.query.sortType || "desc";
  const sortBy = req.query.sortBy || "createdAt";
  const searchQuery = req.query.search || "";
  const status = req.query.status || "";

  try {
    const { data, totalItems } = await articleServices.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
      status
    });

    const { pagination, totalPage } = paginationGenerate({
      page,
      limit,
      totalItems,
    });

    const links = generatePaginationLinks({
      path: req.baseUrl + req.path,
      page,
      totalPage,
      limit,
      sortType,
      sortBy,
      searchQuery,
      status
    });

    // transfrom user data for response
    const articles = transfromData({
      items: data,
      selection: [
        "_id",
        "title",
        "status",
        "avatar",
        "authors",
        "updatedAt",
        "createdAt",
      ],
      path: req.baseUrl + req.path,
    });

    // final response
    const response = {
      code: 200,
      data: articles,
      pagination,
      links,
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findAllItems;
