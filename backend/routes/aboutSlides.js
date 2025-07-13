const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    // slide
    const { link, image, title, slogan } = req.body;
    if (!image) {
      return res.status(400).send("Thiếu thông tin: image là bắt buộc");
    }

    const aboutRef = db.collection("slide").doc();
    await aboutRef.set({
      link,
      image,
      title,
      slogan,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: aboutRef.id, message: "Them slide thanh cong" });
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

router.delete("/:id", async (req, res) => {
  try {
    const aboutRef = db.collection("slide").doc(req.params.id);
    await aboutRef.delete();
    res.status(200).json({ message: "Xoa slide thanh cong" });
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { link, image, title } = req.body;
    const aboutRef = db.collection("slide").doc(req.params.id);
    await aboutRef.update({
      link,
      image,
      title,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Cap nhat slide thanh cong" });
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const aboutRef = db.collection("slide").doc(req.params.id);
    const doc = await aboutRef.get();
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

module.exports = router;
