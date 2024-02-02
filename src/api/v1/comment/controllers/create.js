const { generateBadRequestError } = require("../../../../utils/error");
const commentServices = require("../../../../lib/comment");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const create = async (req, res, next) => {
  const { text, article } = req.body;

  if (!text || !article) {
    const error = generateBadRequestError({ text, article });
    next(error);
  }

  try {
    const createdComment = await commentServices.create({
      text,
      article,
      authors: req.user.id,
    });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: createdComment,
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
      self: `/comments/${createdComment.id}`,
      authors: `/users/${createdComment.authors._id}`,
      article: `/articles/${createdComment.article._id}`,
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
