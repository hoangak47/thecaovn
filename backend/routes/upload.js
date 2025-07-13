const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");

const upload = multer({ storage });

const { uploadFile } = require("../controllers/uploadController");

// Đổi tên route cho phù hợp đa phương tiện (không còn chỉ là "image")
router.post("/", upload.single("upload"), uploadFile);

module.exports = router;
