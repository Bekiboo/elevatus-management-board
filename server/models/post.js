const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Post", postSchema);
