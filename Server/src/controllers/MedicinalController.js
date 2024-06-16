const Comment2 = require("../models/Comment2");
const Medicinal = require("../models/Medicinal");
const populateComments = async (commentId) => {
  const comment = await Comment2.findById(commentId).populate("user");
  if (comment.children && comment.children.length > 0) {
    await Promise.all(
      comment.children.map(async (childId) => {
        const childComment = await populateComments(childId);
        comment.children = comment.children.map((c) =>
          c._id.toString() === childId.toString() ? childComment : c
        );
      })
    );
  }
  return comment;
};
// Phương thức tạo mới một dược liệu
exports.createMedicinal = async (req, res) => {
  try {
    const medicinal = await Medicinal.create(req.body);
    res.status(201).json({ success: true, data: medicinal });
  } catch (error) {
    console.error("Error creating medicinal:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Phương thức xóa một dược liệu
exports.deleteMedicinal = async (req, res) => {
  try {
    const medicinalId = req.params.id;
    const medicinal = await Medicinal.findByIdAndDelete(medicinalId);
    if (!medicinal) {
      return res
        .status(404)
        .json({ success: false, message: "Medicinal not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Medicinal deleted successfully" });
  } catch (error) {
    console.error("Error deleting medicinal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Phương thức cập nhật thông tin dược liệu
exports.updateMedicinal = async (req, res) => {
  try {
    const medicinalId = req.params.id;
    const updates = req.body;
    const updatedMedicinal = await Medicinal.findByIdAndUpdate(
      medicinalId,
      updates,
      {
        new: true,
      }
    );
    if (!updatedMedicinal) {
      return res
        .status(404)
        .json({ success: false, message: "Medicinal not found" });
    }
    res.status(200).json({ success: true, data: updatedMedicinal });
  } catch (error) {
    console.error("Error updating medicinal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Phương thức lấy tất cả các dược liệu với phân trang
exports.getAllMedicinals = async (req, res) => {
  try {
    // Trang hiện tại, mặc định là 1 nếu không có được cung cấp
    const page = parseInt(req.query.page) || 1;
    // Số lượng dược liệu trên mỗi trang, mặc định là 10 nếu không có được cung cấp
    const limit = parseInt(req.query.limit) || 10;

    // Số lượng dược liệu bắt đầu từ vị trí của trang hiện tại
    const startIndex = (page - 1) * limit;
    // Số lượng dược liệu kết thúc ở vị trí của trang hiện tại
    const endIndex = page * limit;

    // Tổng số lượng dược liệu
    const total = await Medicinal.countDocuments();

    // Lấy dược liệu cho trang hiện tại
    const medicinals = await Medicinal.find()
      .limit(limit)
      .skip(startIndex)
      .exec();

    // Xây dựng kết quả phân trang
    const pagination = {};

    // Nếu vị trí kết thúc nhỏ hơn tổng số lượng dược liệu, có trang tiếp theo
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    // Nếu vị trí bắt đầu lớn hơn 0, có trang trước đó
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res
      .status(200)
      .json({ success: true, data: medicinals, total, pagination });
  } catch (error) {
    console.error("Error fetching all medicinals:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Phương thức lấy thông tin dược liệu dựa trên ID
exports.getMedicinalById = async (req, res) => {
  try {
    const medicinalId = req.params.id;
    const medicinal = await Medicinal.findById(medicinalId).populate(
      "comment2"
    );
    if (!medicinal) {
      return res
        .status(404)
        .json({ success: false, message: "Medicinal not found" });
    }
    const populatedComments = await Promise.all(
      medicinal.comment2.map((commentId) => populateComments(commentId))
    );
    res.status(200).json({ success: true, data: medicinal, populatedComments });
  } catch (error) {
    console.error("Error fetching medicinal by id:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Phương thức lấy danh sách các dược liệu theo id của nhóm bệnh với phân trang
exports.getMedicinalsByDiseaseId = async (req, res) => {
  try {
    const diseaseId = req.params.diseaseId.split("&")[0];
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const medicinals = await Medicinal.find({ diseaseGroupId: diseaseId })
      .limit(limit)
      .skip(startIndex)
      .exec();

    const total = await Medicinal.countDocuments({ diseaseGroupId: diseaseId });

    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res
      .status(200)
      .json({ success: true, data: medicinals, total, pagination });
  } catch (error) {
    console.error("Error fetching medicinals by disease id:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Phương thức tìm kiếm dược liệu
exports.searchMedicinals = async (req, res) => {
  try {
    const { query, page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const regex = new RegExp(query, "i");
    const total = await Medicinal.countDocuments({ name: regex });

    const medicinals = await Medicinal.find({ name: regex })
      .limit(limit)
      .skip(startIndex)
      .exec();

    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: parseInt(page) + 1,
        limit: parseInt(limit),
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: parseInt(page) - 1,
        limit: parseInt(limit),
      };
    }

    res
      .status(200)
      .json({ success: true, data: medicinals, total, pagination });
  } catch (error) {
    console.error("Error searching for medicinals:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
