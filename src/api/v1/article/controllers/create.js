const { generateBadRequestError } = require("../../../../utils/error");
const articleServices = require("../../../../lib/article");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const create = async (req, res, next) => {
  const { title, body } = req.body;
  const avatar = req.file?.path || "";

  if (!title || !body) {
    const error = generateBadRequestError({ title, body });
    next(error);
  }

  try {
    const createdArticle = await articleServices.create({
      title,
      body,
      avatar,
      authors: req.user._id,
    });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: createdArticle,
      selection: ["_id", "title", "body", "status", "avatar", "authors", "updatedAt", "createdAt"],
    });

    // generate links
    const links = {
      self: `/articles/${createdArticle.id}`,
      authors: `/users/${createdArticle.authors._id}`,
      comments: `/articles/${createdArticle.id}/comments`
    };

    const response = {
      code: 201,
      data,
      links,
    };

    // send final response
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
