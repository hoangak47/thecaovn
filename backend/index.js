const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const uploadRouter = require("./routes/upload.js");
const aboutRoutes = require("./routes/about.js");
const aboutSlidesRoutes = require("./routes/aboutSlides.js");
const categoriesRoutes = require("./routes/categories.js");
const tieuChiRoutes = require("./routes/tieuChi.js");
const doiTacRoutes = require("./routes/doiTac.js");
const khachHangRoutes = require("./routes/khachHang.js");
const tinTucRoutes = require("./routes/tinTuc.js");
const mainRoutes = require("./routes/main.js");
const sanPhamRoutes = require("./routes/sanPham.js");
const lienHeRoutes = require("./routes/lienHe.js");
const loginRoutes = require("./routes/login.js");
const footerRoutes = require("./routes/footer.js");
const menuRoutes = require("./routes/menu.js");

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://thecaovn.com",
  "https://thecaovn-liard.vercel.app",
  "https://www.motelchauthanhtiengiang.cloud",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
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
app.use("/login", loginRoutes);
app.use("/footer", footerRoutes);
app.use("/menu", menuRoutes);
app.use("/", mainRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
