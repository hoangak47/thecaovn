const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

// Thêm người dùng (Create)
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res
        .status(400)
        .send("Thiếu thông tin: name, email, age là bắt buộc");
    }

    const userRef = db.collection("users").doc();
    await userRef.set({
      name,
      email,
      age,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res
      .status(201)
      .json({ id: userRef.id, message: "Thêm người dùng thành công" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

// Lấy tất cả người dùng (Read - List)
router.get("/", async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

// Lấy người dùng theo ID (Read - Single)
router.get("/:id", async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.params.id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send("Không tìm thấy người dùng");
    }

    return res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

// Cập nhật người dùng (Update)
router.put("/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const userRef = db.collection("users").doc(req.params.id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send("Không tìm thấy người dùng");
    }

    await userRef.update({
      name: name || doc.data().name,
      email: email || doc.data().email,
      age: age || doc.data().age,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Cập nhật người dùng thành công" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

// Xóa người dùng (Delete)
router.delete("/:id", async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.params.id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send("Không tìm thấy người dùng");
    }

    await userRef.delete();
    return res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

module.exports = router;
