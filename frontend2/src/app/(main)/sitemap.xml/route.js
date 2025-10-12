import axios from "axios";

export async function GET() {
  const baseUrl = "https://thecaovn.com";
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Gọi API lấy danh sách bài viết
  let ids = [];
  console.log(`${API_URL}/sitemap`);
  try {
    const res = await axios.get(`${API_URL}sitemap`);
    ids = res.data;
  } catch (error) {
    ids = [];
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
  const dynamicUrls = ids.map((id) => `/${id}`);

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
