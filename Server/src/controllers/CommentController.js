const Comment = require("../models/Comments");
const Medicinal = require("../models/Medicinal");
const Comment2 = require("../models/Comment2");

// Add a new comment
exports.addComment = async (req, res) => {
  try {
    const { medicinalId, content, author } = req.body;

    // Check if the medicinal entry exists
    const medicinal = await Medicinal.findById(medicinalId);
    if (!medicinal) {
      return res.status(404).json({ message: "Medicinal entry not found" });
    }

    const comment = new Comment({
      medicinalId,
      content,
      author,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a specific medicinal entry
exports.getCommentsByMedicinal = async (req, res) => {
  try {
    const { medicinalId } = req.params;

    // Check if the medicinal entry exists
    const medicinal = await Medicinal.findById(medicinalId);
    if (!medicinal) {
      return res.status(404).json({ message: "Medicinal entry not found" });
    }

    const comments = await Comment.find({ medicinalId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createComment2 = async (req, res) => {
  const { name, parentId, idUser, medicinalId, imgUser } = req.body; // Bao gồm imgUser trong body của yêu cầu
  try {
    const newComment = new Comment2({
      name: name,
      parent: parentId,
      user: idUser,
      medicinalId: medicinalId,
      imgUser: imgUser, // Thiết lập trường imgUser
    });
    const savedComment = await newComment.save();

    if (parentId) {
      await Comment2.findByIdAndUpdate(parentId, {
        $push: { children: savedComment._id },
      });
    } else {
      await Medicinal.findByIdAndUpdate(
        medicinalId,
        { $addToSet: { comment2: savedComment._id } },
        {
          new: true,
        }
      );
    }
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getCOmmentTree = async (req, res) => {
  const { commentId } = req.params;
  try {
    const rootComment = await Comment2.findById(commentId)
      .populate("children")
      .populate("user");
    const getChildren = async (comment) => {
      if (comment.children && comment.children.length > 0) {
        for (let i = 0; i < comment.children.length; i++) {
          const child = await Comment2.findById(comment.children[i]._id)
            .populate("children")
            .populate("user");
          comment.children[i] = child;
          await getChildren(child);
        }
      }
    };
    await getChildren(rootComment);
    res.json(rootComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.removeComment = async (req, res) => {
  try {
    const Comment = await Comment2.findByIdAndDelete(req.params.id);
    res.json({
      message: "Comment deleted successfully",
      Comment: Comment,
    });
  } catch (error) {
    throw new Error(error);
  }
};
exports.editComment = async (req, res) => {
  console.log(req.params.id);
  try {
    const comment = await Comment2.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    if (!comment) {
      return res.status(200).json({
        message: "Cập nhật Comment  không thành công",
      });
    }
    return res.json({
      message: "succes update",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
