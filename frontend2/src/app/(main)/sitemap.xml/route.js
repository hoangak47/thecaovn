import axios from "axios";

export async function GET() {
  const baseUrl = "https://thecaovn.com";
  const baseNEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Gọi API lấy danh sách bài viết
  let posts = [];
  try {
    const [danhMuc, tinTuc] = await Promise.all([
      axios.get(`${baseNEXT_PUBLIC_API_URL}/danh-muc`),
      axios.get(`${baseNEXT_PUBLIC_API_URL}/tin-tuc`),
    ]);

    posts = [...danhMuc.data, ...tinTuc.data];
  } catch (error) {
    posts = [];
  }

  const staticUrls = [
    "",
    "/gioi-thieu",
    "/san-pham",
    "/nganh-nghe",
    "/gia-cong",
    "/tin-tuc",
    "/lien-he",
    // Thêm các đường dẫn tĩnh khác
  ];

  // Tạo url động từ dữ liệu API
  const dynamicUrls = posts.map((post) => `/${post.url}`);

  const urls = staticUrls.concat(dynamicUrls);

  // Escape XML characters
  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
        default:
          return c;
      }
    });
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${escapeXml(baseUrl + url)}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
