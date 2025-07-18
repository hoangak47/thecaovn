import axios from "axios";

const defaultMenu = [
  { title: "Trang chủ", link: "/" },
  { title: "Giới thiệu", link: "/gioi-thieu" },
  { title: "Sản phẩm", link: "/san-pham" },
  { title: "Ngành nghề", link: "/nganh-nghe" },
  { title: "Gia Công", link: "/gia-cong" },
  { title: "Tin tức", link: "/tin-tuc" },
  { title: "Liên hệ", link: "/lien-he" },
];

export default async function getCategoryMenu() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${url}danh-muc`);
    const data = res.data;

    const updatedMenu = defaultMenu.map((item) => {
      const key = item.link.replace(/^\//, "");
      const children = data
        .filter((d) => d.parent_category === key)
        .map((d) => ({ title: d.title, link: `/${d.url}` }));
      return children.length > 0 ? { ...item, children } : item;
    });

    return updatedMenu;
  } catch (error) {
    return defaultMenu;
  }
}
