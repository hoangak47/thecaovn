const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  try {
    const { title, image, url, ...rest } = req.body;
    if (!title || !image || !url) {
      return res
        .status(400)
        .send("Thieu thong tin: title, image, url la bat buoc");
    }

    const categoryRef = db.collection("categories").doc(url);
    await categoryRef.set({
      title,
      image,
      url,
      type: "category",
      ...rest,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res
      .status(201)
      .json({ id: categoryRef.id, message: "Them danh muc thanh cong" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.get("/", async (req, res) => {
  const { search } = req.query;
  if (search) {
    const categories = [];
    const querySnapshot = await db
      .collection("categories")
      .where("parent_category", "==", search)
      .orderBy("updatedAt", "desc")
      .get();
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(categories);
  }

  try {
    const categories = [];
    const querySnapshot = await db
      .collection("categories")
      .orderBy("updatedAt", "desc")
      .get();
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryRef = db.collection("categories").doc(req.params.id);
    const doc = await categoryRef.get();

    if (!doc.exists) {
      return res.status(404).send("Khong tim thay danh muc");
    }

    await categoryRef.delete();
    return res.status(200).json({ message: "Xoa danh muc thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, image, url, ...rest } = req.body;
    const categoryRef = db.collection("categories").doc(req.params.id);
    const doc = await categoryRef.get();

    if (!doc.exists) {
      return res.status(404).send("Khong tim thay danh muc");
    }

    await categoryRef.update({
      title: title || doc.data().title,
      description: description || doc.data().description,
      image: image || doc.data().image,
      url: url || doc.data().url,
      type: "category",
      ...rest,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Cap nhat danh muc thanh cong" });
  } catch (error) {
    return res.status(500).send(`Loi: ${error.message}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryRef = db.collection("categories").doc(req.params.id);
    const doc = await categoryRef.get();
    return res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

module.exports = router;
