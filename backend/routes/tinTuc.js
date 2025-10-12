const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    const { title, short_description, description, url, ...rest } = req.body;
    if (!title || !short_description || !description) {
      return res
        .status(400)
        .send(
          "Thiếu thông tin: title, short_description, description là bắt buộc"
        );
    }

    const ref = db.collection("tin-tuc").doc(url);
    await ref.set({
      title,
      short_description,
      description,
      type: "tin-tuc",
      url,
      ...rest,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res
      .status(201)
      .json({ id: ref.id, message: "Thêm thông tin thành công" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const ref = db.collection("tin-tuc").orderBy("updatedAt", "desc");
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

router.delete("/:id", async (req, res) => {
  try {
    const ref = db.collection("tin-tuc").doc(req.params.id);
    const doc = await ref.get();
    await ref.delete();
    return res.status(200).json({ message: "Xoa tin tuc thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ref = db.collection("tin-tuc").doc(req.params.id);
    const doc = await ref.get();
    if (!doc.exists) {
      return res.status(404).send("Khong tim thay tin tuc");
    }
    return res.status(200).json(doc.data());
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, short_description, description, ...rest } = req.body;
    const ref = db.collection("tin-tuc").doc(req.params.id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).send("Khong tim thay tin tuc");
    }

    await ref.update({
      title: title || doc.data().title,
      short_description: short_description || doc.data().short_description,
      description: description || doc.data().description,
      ...rest,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Cap nhat tin tuc thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

module.exports = router;
