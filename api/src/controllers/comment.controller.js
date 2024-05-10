const mongoose = require("mongoose");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const { commentErrorHandler } = require("../utils/apiHelper");

async function createComment(req, res) {
  const _comment = req.body;
  try {
    const createdBy = req.userId;
    const postId = new mongoose.Types.ObjectId(_comment.postId);
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const comment = await Comment.create({
      ..._comment,
      createdBy,
      postId: post._id,
    });
    await comment.populate("createdBy");

    res.status(201).json(comment);
  } catch (error) {
    commentErrorHandler(error, res);
  }
}

async function getComments(req, res) {
  try {
    const postId = req.params.postId;
    console.log("postId:", postId);
    const comments = await Comment.find({ postId }).populate("createdBy");
    console.log("Comments", comments);
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    commentErrorHandler(error, res);
  }
}

async function removeComment(req, res) {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      throw new Error("Cast to ObjectId");
    }
    res.status(204).json();
  } catch (error) {
    commentErrorHandler(error, res);
  }
}

async function removeAllComments(req, res) {
  try {
    const postId = req.params.postId;

    await Comment.deleteMany({ postId: postId });

    res.status(200).json({ message: "Comments deleted successfully" });
  } catch (error) {
    commentErrorHandler;
  }
}

module.exports = {
  createComment,
  getComments,
  removeComment,
  removeAllComments,
};
