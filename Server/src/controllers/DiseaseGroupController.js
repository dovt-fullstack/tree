const DiseaseGroup = require("../models/DiseaseGroup");

// Phương thức tạo mới một nhóm bệnh
exports.createDiseaseGroup = async (req, res) => {
  try {
    const diseaseGroup = await DiseaseGroup.create(req.body);
    res.status(201).json({ success: true, data: diseaseGroup });
  } catch (error) {
    console.error("Error creating disease group:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Phương thức cập nhật thông tin nhóm bệnh
exports.updateDiseaseGroup = async (req, res) => {
  try {
    const diseaseGroupId = req.params.id;
    const updates = req.body;
    const updatedDiseaseGroup = await DiseaseGroup.findByIdAndUpdate(
      diseaseGroupId,
      updates,
      {
        new: true,
      }
    );
    if (!updatedDiseaseGroup) {
      return res
        .status(404)
        .json({ success: false, message: "Disease group not found" });
    }
    res.status(200).json({ success: true, data: updatedDiseaseGroup });
  } catch (error) {
    console.error("Error updating disease group:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Phương thức xóa một nhóm bệnh
exports.deleteDiseaseGroup = async (req, res) => {
  try {
    const diseaseGroupId = req.params.id;
    const diseaseGroup = await DiseaseGroup.findByIdAndDelete(diseaseGroupId);
    if (!diseaseGroup) {
      return res
        .status(404)
        .json({ success: false, message: "Disease group not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Disease group deleted successfully" });
  } catch (error) {
    console.error("Error deleting disease group:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Phương thức lấy danh sách tất cả các nhóm bệnh
exports.getAllDiseaseGroups = async (req, res) => {
  try {
    const diseaseGroups = await DiseaseGroup.find();
    res.status(200).json({ success: true, data: diseaseGroups });
  } catch (error) {
    console.error("Error fetching disease groups:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
