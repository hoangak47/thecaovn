const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    // slide
    const { link, image } = req.body;
    if (!link || !image) {
      return res.status(400).send("Thiếu thông tin: link, image là bắt buộc");
    }

    const aboutRef = db.collection("slide").doc();
    await aboutRef.set({
      link,
      image,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const aboutRef = db.collection("slide");
    const querySnapshot = await aboutRef.get();
    const slides = [];
    querySnapshot.forEach((doc) => {
      slides.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

module.exports = router;
