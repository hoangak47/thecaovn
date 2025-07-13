const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    const { ...rest } = req.body;

    const ref = db.collection("lien-he").doc("info");
    await ref.set({
      ...rest,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: ref.id, message: "Thêm thông tin thành công" });
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const ref = db.collection("lien-he").doc("info");
    const doc = await ref.get();
    if (!doc.exists) {
      return res.status(404).send("Khong tim thay lien he");
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

module.exports = router;
