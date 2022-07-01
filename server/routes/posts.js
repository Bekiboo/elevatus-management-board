var express = require("express");
var router = express.Router();

const Post = require("../models/post");

router.get("/", (req, res, next) => {
  Post.find().exec((err, postList) => {
    if (err) {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    }
    return res.status(200).json(postList);
  });
});

router.post("/", async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
  });

  try {
    const createdPost = await post.save();
    res.status(201).json({
      message: "Post added successfully",
      post: createdPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred",
      error: err,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    post.name = req.body.name;
    post.description = req.body.description;
    post.url = req.body.url;

    try {
      const result = await Post.updateOne({ id: req.params.id }, post);
      res.status(204).json({
        message: "Post updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "An error occurred",
        error: err,
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Post not found.",
      error: { post: "Post not found" },
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findOne({ id: req.params.id });

    try {
      const result = await Post.deleteOne({ id: req.params.id });
      res.status(204).json({
        message: "Post deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "An error occurred",
        error: err,
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Post not found.",
      error: { post: "Post not found" },
    });
  }
});

module.exports = router;
