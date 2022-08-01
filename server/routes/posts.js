var express = require("express");
var router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const Post = require("../models/post");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

// Store Images Through File Picker
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "server/images/blog");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

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

router.post(
  "/",
  multer({ storage: storage }).single("image"),
  async (req, res, next) => {
    const { filename: image } = req.file;

    await sharp(req.file.path)
      .resize(1000)
      .toFile(path.resolve(req.file.destination, "resized", image));
    fs.unlinkSync(req.file.path);

    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      date: Date.now(),
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/blog/resized/" + req.file.filename,
    });

    try {
      const createdPost = await post.save();
      res.status(201).json({
        message: "Post added successfully",
        post: createdPost,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "An error occurred",
        error: err,
      });
    }
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  async (req, res, next) => {
    let imagePath = req.body.imagePath;

    if (req.file) {
      const { filename: image } = req.file;

      await sharp(req.file.path)
        .resize(1000)
        .toFile(path.resolve(req.file.destination, "resized", image));
      fs.unlinkSync(req.file.path);

      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/blog/resized/" + req.file.filename;
    }

    try {
      const post = await Post.findOne({ _id: req.params.id });
      post.title = req.body.title;
      post.imagePath = imagePath;
      post.content = req.body.content;

      try {
        const result = await Post.updateOne({ _id: req.params.id }, post);
        res.status(200).json({
          message: "Post updated successfully",
          post: post
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
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    try {
      const result = await Post.deleteOne({ _id: req.params.id });
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
