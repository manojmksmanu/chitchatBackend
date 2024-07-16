const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { sendMessage } = require("../controller/messageController");
const { allMessages } = require("../controller/messageController");
const router = express.Router();

router.route("/message").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
