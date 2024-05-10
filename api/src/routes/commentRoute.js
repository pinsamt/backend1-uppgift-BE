const Express = require("express");
const {
  createComment,
  getComments,
  removeComment,
  removeAllComments,
} = require("../controllers/comment.controller");
const userMiddleware = require("../middleware/user.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const commentRouter = Express.Router();

commentRouter.post("/create", userMiddleware, createComment);
commentRouter.get("/:postId", getComments);
commentRouter.delete(
  "/delete/:id",
  userMiddleware,
  adminMiddleware,
  removeComment
);
commentRouter.delete(
  "/delete/all/:postId",
  userMiddleware,
  adminMiddleware,
  removeAllComments
);

module.exports = commentRouter;
