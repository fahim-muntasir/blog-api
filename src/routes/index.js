const router = require("express").Router();
const userController = require("../api/v1/user");
const articleController = require("../api/v1/article");
const commentController = require("../api/v1/comment");
const authController = require("../api/v1/auth");

// api health route
router.get("/health", (_req, res) => {
  res.status(200).json({
    health: "Ok",
  });
});

// ======== api/v1 user route start ========
router
  .route("/v1/users")
  .get(userController.findAllItems)
  .post(userController.create);

router
  .route("/v1/users/:id")
  .get(userController.findSingleItem)
  .patch(userController.updateItem)
  .delete(userController.deleteItem);
// ======== api/v1 user route end ========

// ======== api/v1 article route start ========
router
  .route("/v1/articles")
  .get(articleController.findAllItems)
  .post(articleController.create);

router
  .route("/v1/articles/:id")
  .get(articleController.findSingleItem)
  .patch(articleController.updateItem)
  .delete(articleController.deleteItem);
// ======== api/v1 article route end ========

// ======== api/v1 comments route start ========
router
  .route("/v1/comments")
  .get(commentController.findAllItems)
  .post(commentController.create);

router
  .route("/v1/comments/:id")
  .get(commentController.findSingleItem)
  .patch(commentController.updateItem)
  .delete(commentController.deleteItem);
// ======== api/v1 comments route end ========

// ======== api/v1 auth route start ========
router.route("/v1/signin").post(authController.signin);
// ======== api/v1 auth route end ========

module.exports = router;
