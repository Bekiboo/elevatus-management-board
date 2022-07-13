const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = Schema({
  date: { type: Number, required: true },
  title: { type: String, required: true },
  imgUrl: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Post", postSchema);
