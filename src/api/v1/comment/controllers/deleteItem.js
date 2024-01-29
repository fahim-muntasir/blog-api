const commentServices = require("../../../../lib/comment");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedComment = await commentServices.deleteItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: deletedComment,
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

    const response = {
      code: 200,
      data,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteItem;
