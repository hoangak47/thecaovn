const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.get("/", async (req, res) => {
  try {
    const ref = db.collection("menu");
    const docs = await ref.orderBy("createdAt", "asc").get();
    const data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, link } = req.body;
    if (!title || !link) {
      return res.status(400).send("Thieu thong tin: title, link la bat buoc");
    }

    const ref = db.collection("menu").doc();
    await ref.set({
      title,
      link,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res
      .status(201)
      .json({ id: ref.id, message: "Them menu thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

module.exports = router;
