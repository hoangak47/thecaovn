const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const uploadRouter = require("./routes/upload");
const aboutRoutes = require("./routes/about");
const aboutSlidesRoutes = require("./routes/aboutSlides.js");
const categoriesRoutes = require("./routes/categories.js");
const tieuChiRoutes = require("./routes/tieuChi.js");
const doiTacRoutes = require("./routes/doiTac.js");
const khachHangRoutes = require("./routes/khachHang.js");
const tinTucRoutes = require("./routes/tinTuc.js");
const mainRoutes = require("./routes/main.js");
const sanPhamRoutes = require("./routes/sanPham.js");
const lienHeRoutes = require("./routes/lienHe.js");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // cho phép frontend Next.js truy cập
    credentials: true, // nếu cần gửi cookie/auth (tùy)
  })
);

// Cho JSON
app.use(bodyParser.json({ limit: "10mb" }));
// Cho form-data (upload file)
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Nếu dùng express.json() và express.urlencoded()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Sử dụng routes
app.use("/upload", uploadRouter);
app.use("/gioi-thieu", aboutRoutes);
app.use("/slide", aboutSlidesRoutes);
app.use("/danh-muc", categoriesRoutes);
app.use("/tieu-chi", tieuChiRoutes);
app.use("/doi-tac", doiTacRoutes);
app.use("/khach-hang", khachHangRoutes);
app.use("/tin-tuc", tinTucRoutes);
app.use("/san-pham", sanPhamRoutes);
app.use("/lien-he", lienHeRoutes);
app.use("/", mainRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
