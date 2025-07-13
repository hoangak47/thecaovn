const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.post("/", async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(400).send("Thiếu thông tin: id, password là bắt buộc");
  }

  try {
    const userRef = db.collection("users").where("id", "==", id);
    const querySnapshot = await userRef.get();
    if (querySnapshot.empty) {
      return res.status(404).send("Không tìm thấy người dùng");
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password !== password) {
      return res.status(401).send("Sai mat khau");
    }

    res.cookie("token", id, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    console.log("token");

    return res.status(200).json({ id: userDoc.id, ...userData });
  } catch (error) {
    return res.status(500).send(`Lỗi đang nhập`);
  }
});

module.exports = router;
