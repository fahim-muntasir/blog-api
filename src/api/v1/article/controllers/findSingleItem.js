const articleServices = require("../../../../lib/article");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    // find article by id
    const article = await articleServices.findSingleItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: article,
      selection: ["_id", "title", "body", "status", "avatar", "authors", "updatedAt", "createdAt"],
    });

    const response = {
      code: 200,
      data,
      links: {
        self: req.originalUrl
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
