const mongoose = require("mongoose");
const { Schema } = mongoose;

const childSchema = Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  sexe: { type: String },
  imageUrl: { type: String },
  // group: [{ type: Schema.Types.ObjectId, ref: "Child" }],
  group: {},
});

module.exports = mongoose.model("Child", childSchema);
