const mongoose = require("mongoose");

const newFeedSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const newFeed = mongoose.model("newFeed", newFeedSchema);

module.exports = newFeed;
