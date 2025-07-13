const express = require("express");
const router = express.Router();
const { db, admin } = require("../config/firebase");

router.get("/", async (req, res) => {
  res.send("Kết nối Firestore thành công!");
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collections = ["categories", "tin-tuc"];
    let results = [];

    for (const col of collections) {
      const doc = await db.collection(col).doc(id).get();
      if (doc.exists) {
        results.push({ data: doc.data() });
      }
    }

    if (results.length === 0) {
      return res.status(404).send("Không tìm thấy id ở bất kỳ collection nào");
    }

    return res.status(200).json(results[0].data);
  } catch (error) {
    return res.status(500).send(`Lỗi: ${error.message}`);
  }
});

module.exports = router;
