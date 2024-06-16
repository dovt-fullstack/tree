const mongoose = require("mongoose");

const diseaseGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const DiseaseGroup = mongoose.model("DiseaseGroup", diseaseGroupSchema);

module.exports = DiseaseGroup;
