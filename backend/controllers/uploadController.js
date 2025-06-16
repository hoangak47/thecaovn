exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      message: "Upload thành công!",
      url: req.file.path,
      alt: req.file.originalname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload thất bại" });
  }
};
