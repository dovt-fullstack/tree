const express = require("express");
const medicinalController = require("../controllers/MedicinalController");
const router = express.Router();

// Route tạo mới một dược liệu
router.post("/create", medicinalController.createMedicinal);

// Route xóa một dược liệu
router.delete("/:id", medicinalController.deleteMedicinal);

// Route cập nhật thông tin dược liệu
router.put("/:id", medicinalController.updateMedicinal);
// Route lấy danh sách các dược liệu theo id của nhóm bệnh
router.get(
  "/getByDiseaseId/:diseaseId",
  medicinalController.getMedicinalsByDiseaseId
);

// Route lấy thông tin dược liệu dựa trên ID
router.get("/getById/:id", medicinalController.getMedicinalById);

// Route lấy tất cả các dược liệu
router.get("/getAll", medicinalController.getAllMedicinals);

// Thêm route tìm kiếm dược liệu
router.get("/search", medicinalController.searchMedicinals);

module.exports = router;
