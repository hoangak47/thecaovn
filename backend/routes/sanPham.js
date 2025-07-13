const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    const { title, url, type, ...rest } = req.body;
    if (!title || !type || !url) {
      return res
        .status(400)
        .send("Thieu thong tin: title, type, url la bat buoc");
    }

    const ref = db.collection("san-pham").doc(url);
    await ref.set({
      title,
      type,
      url,
      ...rest,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res
      .status(201)
      .json({ id: ref.id, message: "Them san pham thanh cong" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/", async (req, res) => {
  const { search } = req.query;
  if (search) {
    const categories = [];
    const querySnapshot = await db
      .collection("san-pham")
      .where("parent_category", "==", search)
      .orderBy("updatedAt", "desc")
      .get();
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(categories);
  }
  try {
    const ref = db.collection("san-pham").orderBy("updatedAt", "desc");
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
    const categoryRef = db.collection("san-pham").doc(req.params.id);
    const doc = await categoryRef.get();
    return res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ref = db.collection("san-pham").doc(req.params.id);
    const doc = await ref.get();
    await ref.delete();
    return res.status(200).json({ message: "Xoa san pham thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, url, type, ...rest } = req.body;
    const ref = db.collection("san-pham").doc(req.params.id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).send("Khong tim thay san pham");
    }

    await ref.update({
      title: title || doc.data().title,
      url: url || doc.data().url,
      type: type || doc.data().type,
      ...rest,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Cap nhat san pham thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

module.exports = router;
