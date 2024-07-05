const express = require("express");
const { registerUser, authUser } = require("../controller/userController");
const router = express.Router();

// router.route("/user").post(() => {
//   registerUser;
// });
router.post("/user",registerUser);
router.post("/login", authUser);

module.exports = router;
