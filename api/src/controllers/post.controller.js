const Post = require("../models/postModel");
const { postErrorHandler } = require("../utils/apiHelper");

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    postErrorHandler(error, res);
  }
}

async function createPost(req, res) {
  try {
    const _post = req.body;
    const post = await Post.create(_post);
    if (!post) {
      throw new Error("Cast to ObjectId");
    }
    res.status(201).json(post);
  } catch (error) {
    postErrorHandler(error, res);
  }
}

async function removePost(req, res) {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      throw new Error("Cast to ObjectId");
    }
    res.status(204).json();
  } catch (error) {
    postErrorHandler(error, res);
  }
}

module.exports = { getAllPosts, createPost, removePost };
