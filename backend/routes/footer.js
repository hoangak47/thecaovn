const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.get("/", async (req, res) => {
  try {
    const ref = db.collection("footer").doc("info");
    const doc = await ref.get();
    if (!doc.exists) {
      return res.status(404).send("Khong tim thay footer");
    }
    return res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { ...rest } = req.body;

    const ref = db.collection("footer").doc("info");
    await ref.set({
      ...rest,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res
      .status(201)
      .json({ id: ref.id, message: "Them thong tin thanh cong" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.put("/info", async (req, res) => {
  try {
    const { ...rest } = req.body;

    const ref = db.collection("footer").doc("info");
    await ref.update({
      ...rest,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Cap nhat thong tin thanh cong" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

module.exports = router;
