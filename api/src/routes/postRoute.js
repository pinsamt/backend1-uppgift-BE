const Express = require("express");
const {
  getAllPosts,
  createPost,
  removePost,
} = require("../controllers/post.controller");
const userMiddleware = require("../middleware/user.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const postRouter = Express.Router();

postRouter.post("/create", userMiddleware, createPost);
postRouter.get("/all", getAllPosts);
postRouter.delete("/delete/:id", userMiddleware, adminMiddleware, removePost);

module.exports = postRouter;
