const articleServices = require("../../../../lib/article");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const updateItem = async (req, res, next) => {
  const {id} = req.params;
  const body = req.body;

  try {
    // update user
    const updatedArticle = await articleServices.updateItem({data: body, id});

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedArticle,
      selection: ["_id", "title", "body", "status", "avatar", "authors", "updatedAt", "createdAt"],
    });

    const response = {
      code: 200,
      data,
      links: {
        self: req.originalUrl,
        author: `/users/${updatedArticle._id}`,
        comments: `/articles/${updatedArticle._id}/comments`
      }
    }

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = updateItem;