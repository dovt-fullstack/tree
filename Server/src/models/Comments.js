const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  medicinalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicinal",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
