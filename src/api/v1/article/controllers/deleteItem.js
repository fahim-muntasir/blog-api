const articleServices = require("../../../../lib/article");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedArticle = await articleServices.deleteItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: deletedArticle,
      selection: ["_id", "title", "body", "status", "avatar", "authors", "updatedAt", "createdAt"],
    });

    const response = {
      code: 200,
      data
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteItem;
