const commentServices = require("../../../../lib/comment");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    // update user
    const updatedComment = await commentServices.updateItem({ data: body, id });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedComment,
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
      authors: `/users/${updatedComment.authors._id}`,
      article: `/articles/${updatedComment.article._id}`,
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

module.exports = updateItem;
