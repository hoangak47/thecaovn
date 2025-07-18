exports.uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const isVideo = req.file.mimetype.startsWith("video/");
    const isImage = req.file.mimetype.startsWith("image/");

    if (!isImage && !isVideo) {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    return res.json({
      message: "Upload thành công!",
      url: req.file.path,
      type: req.file.mimetype,
      name: req.file.originalname,
    });
  } catch (error) {
    return res.status(500).json({ error: "Upload thất bại" });
  }
};
