const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    const { title, image } = req.body;
    if (!title || !image) {
      return res.status(400).send("Thiếu thông tin: title, image là bắt buộc");
    }

    const ref = db.collection("doi-tac").doc();
    await ref.set({
      title,
      image,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res
      .status(201)
      .json({ id: ref.id, message: "Them tieu chi thanh cong" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const ref = db.collection("doi-tac");
    const querySnapshot = await ref.get();
    const slides = [];
    querySnapshot.forEach((doc) => {
      slides.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(slides);
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ref = db.collection("doi-tac").doc(req.params.id);
    const doc = await ref.get();
    return res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, image } = req.body;
    const ref = db.collection("doi-tac").doc(req.params.id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).send("Khong tim thay tieu chi");
    }

    await ref.update({
      title: title || doc.data().title,
      image: image || doc.data().image,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Cap nhat tieu chi thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ref = db.collection("doi-tac").doc(req.params.id);
    const doc = await ref.get();
    await ref.delete();
    return res.status(200).json({ message: "Xoa tieu chi thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

module.exports = router;
