const commentServices = require("../../../../lib/comment");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    // find article by id
    const comment = await commentServices.findSingleItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: comment,
      selection: [
        "_id",
        "text",
        "status",
        "article",
        "authors",
        "updatedAt",
        "createdAt",
      ],
    });

    // generate links
    const links = {
      self: req.originalUrl,
      authors: `/users/${comment.authors._id}`,
      article: `/articles/${comment.article._id}`,
    };

    const response = {
      code: 200,
      data,
      links,
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
