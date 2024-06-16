const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");

// Add a new comment
router.post("/comments", commentController.addComment);

// Get comments for a specific medicinal entry
router.get("/comments/:medicinalId", commentController.getCommentsByMedicinal);

module.exports = router;
