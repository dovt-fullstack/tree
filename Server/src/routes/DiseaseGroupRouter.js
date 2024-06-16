const express = require("express");
const diseaseGroupController = require("../controllers/DiseaseGroupController");
const router = express.Router();

// Route tạo mới một nhóm bệnh
router.post("/create", diseaseGroupController.createDiseaseGroup);

// Route cập nhật thông tin nhóm bệnh
router.put("/edit/:id", diseaseGroupController.updateDiseaseGroup);

// Route xóa một nhóm bệnh
router.delete("/delete/:id", diseaseGroupController.deleteDiseaseGroup);

// Route lấy danh sách tất cả các nhóm bệnh
router.get("/getAll", diseaseGroupController.getAllDiseaseGroups);

module.exports = router;
