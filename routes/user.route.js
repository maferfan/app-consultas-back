const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const { register, users, login, deleteUser, bemVindo } = require("../controllers/user.controller");
const {authenticateToken} = require('../middleware/token')


router.post("/user", upload.single("fotoPerfil"), register);
router.get("/user", users);
router.get("/bemVindo", authenticateToken, bemVindo);
router.post("/login", login);
router.delete("/user/:_id", deleteUser);

module.exports = router;
