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

// router.put("/", async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     const userRef = db.collection("users").doc(req.params.id);
//     const doc = await userRef.get();

//     if (!doc.exists) {
//       return res.status(404).send("Không tìm thấy người dùng");
//     }

//     await userRef.update({
//       name: name || doc.data().name,
//       email: email || doc.data().email,
//       age: age || doc.data().age,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.status(200).json({ message: "Cập nhật người dùng thành công" });
//   } catch (error) {
//     res.status(500).send(`Lỗi: ${error.message}`);
//   }
// });

module.exports = router;
