const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    const { title, short_description, description, ...rest } = req.body;
    if (!title || !short_description || !description) {
      return res
        .status(400)
        .send(
          "Thiếu thông tin: title, short_description, description là bắt buộc"
        );
    }

    const aboutRef = db.collection("gioi-thieu").doc("gioi-thieu");
    await aboutRef.set({
      title,
      short_description,
      description,
      ...rest,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res
      .status(201)
      .json({ id: aboutRef.id, message: "Thêm thông tin thành công" });
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const usersSnapshot = await db.collection("gioi-thieu").get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.put("/", async (req, res) => {
  try {
    const { title, short_description, description, ...rest } = req.body;
    const aboutRef = db.collection("gioi-thieu").doc("gioi-thieu");
    const doc = await aboutRef.get();

    if (!doc.exists) {
      return res.status(404).send("Khong tim thay thong tin");
    }

    await aboutRef.update({
      title: title || doc.data().title,
      short_description: short_description || doc.data().short_description,
      description: description || doc.data().description,
      ...rest,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Cap nhat thong tin thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

module.exports = router;
