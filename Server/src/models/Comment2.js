const mongoose = require("mongoose");
const comment2Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment2",
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment2",
      },
    ],
    medicinalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicinal",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: true,
    },
    imgUser: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const Comment2 = mongoose.model("Comment2", comment2Schema);

module.exports = Comment2;
