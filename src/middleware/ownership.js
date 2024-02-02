const { forbiddenError } = require("../utils/error");
const userServices = require("../lib/user");
const articleServices = require("../lib/article");
const commentServices = require("../lib/comment");

const ownership = (model) => async (req, _res, next) => {

  if (req.user.role === "admin") {
    return next();
  }

  try {
    // if user admin then this all condition will ingone
    switch (model) {
      case "User":
        const isUserOwner = await userServices.checkOwnerShip({
          resourceId: req.params.id,
          userId: req.user.id,
        });

        if (!isUserOwner) {
          return next(forbiddenError("Permission denied!"));
        }

        return next();

      case "Article":
        const isArticleOwner = await articleServices.checkOwnerShip({
          resourceId: req.params.id,
          userId: req.user.id,
        });

        if (!isArticleOwner) {
          return next(forbiddenError("Permission denied!"));
        }

        return next();

      case "Comment":
        const isCommentOwner = await commentServices.checkOwnerShip({
          resourceId: req.params.id,
          userId: req.user.id,
        });

        if (!isCommentOwner) {
          return next(forbiddenError("Permission denied!"));
        }

        return next();

      default:
        return next(forbiddenError("Permission denied!"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = ownership;
