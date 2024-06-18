const mongoose = require("mongoose");

const medicinalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vietnameseName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  utility: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ecology: {
    type: String,
    required: true,
  },
  distribution: {
    type: String,
    required: true,
  },
  usedPart: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  diseaseGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DiseaseGroup",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  cc1: {
    type: String,
  },
  cc2: {
    type: String,
  },
  comment2: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment2",
    },
  ],
});

const Medicinal = mongoose.model("Medicinal", medicinalSchema);

module.exports = Medicinal;
