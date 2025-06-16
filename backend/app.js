const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const uploadRouter = require("./routes/upload");
const aboutRoutes = require("./routes/about");
const aboutSlidesRoutes = require("./routes/aboutSlides.js");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // cho phép frontend Next.js truy cập
    credentials: true, // nếu cần gửi cookie/auth (tùy)
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng routes
app.use("/users", userRoutes);
app.use("/upload", uploadRouter);
app.use("/gioi-thieu", aboutRoutes);
app.use("/slide", aboutSlidesRoutes);

// Route kiểm tra
app.get("/", (req, res) => {
  res.send("Kết nối Firestore thành công!");
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
