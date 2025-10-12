const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.get("/", async (req, res) => {
  try {
    const categoriesSnap = await db
      .collection("categories")
      .orderBy("order", "asc")
      .orderBy("updatedAt", "desc")
      .get();

    const sanPhamSnap = await db
      .collection("san-pham")
      .orderBy("updatedAt", "desc")
      .get();

    const tinTucSnap = await db
      .collection("tin-tuc")
      .orderBy("updatedAt", "desc")
      .get();

    // Chỉ lấy id
    const categories = categoriesSnap.docs.map((doc) => doc.id);
    const sanPham = sanPhamSnap.docs.map((doc) => doc.id);
    const tinTuc = tinTucSnap.docs.map((doc) => doc.id);

    console.log("categories");
    return res.status(200).json([...categories, ...sanPham, ...tinTuc]);
  } catch (err) {
    return res.status(500).json([]);
  }
});

module.exports = router;
