const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

const { uploadImage } = require("../controllers/uploadController");

router.post("/image", upload.single("upload"), uploadImage);

module.exports = router;
