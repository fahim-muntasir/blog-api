const router = require("express").Router();
const userController = require("../api/v1/user");
const articleController = require("../api/v1/article");
const commentController = require("../api/v1/comment");
const authController = require("../api/v1/auth");

// middleware imports
const authMiddleware = require("../middleware/auth");
const authorizeMiddleware = require("../middleware/authorize");
const ownershipMiddleware = require("../middleware/ownership");

// api health route
router.get("/health", (_req, res) => {
  res.status(200).json({
    health: "Ok",
  });
});

// ======== api/v1 user route start ========
router
  .route("/v1/users")
  .get(
    authMiddleware,
    authorizeMiddleware(["admin"]),
    userController.findAllItems
  )
  .post(userController.create);

router
  .route("/v1/users/:id")
  .get(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("User"),
    userController.findSingleItem
  )
  .patch(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("User"),
    userController.updateItem
  )
  .delete(
    authMiddleware,
    authorizeMiddleware(["admin"]),
    ownershipMiddleware("User"),
    userController.deleteItem
  );
// ======== api/v1 user route end ========

// ======== api/v1 article route start ========
router
  .route("/v1/articles")
  .get(articleController.findAllItems)
  .post(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    articleController.create
  );

router
  .route("/v1/articles/:id")
  .get(articleController.findSingleItem)
  .patch(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Article"),
    articleController.updateItem
  )
  .delete(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Article"),
    articleController.deleteItem
  );
// ======== api/v1 article route end ========

// ======== api/v1 comments route start ========
router
  .route("/v1/comments")
  .get(commentController.findAllItems)
  .post(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    commentController.create
  );

router
  .route("/v1/comments/:id")
  .get(commentController.findSingleItem)
  .patch(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Comment"),
    commentController.updateItem
  )
  .delete(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Comment"),
    commentController.deleteItem
  );

router
  .route("/v1/articles/:id/comments")
  .get(commentController.findItemsByArticleId);
// ======== api/v1 comments route end ========

// ======== api/v1 auth route start ========
router.route("/v1/auth/signin").post(authController.signin);
// ======== api/v1 auth route end ========

module.exports = router;
