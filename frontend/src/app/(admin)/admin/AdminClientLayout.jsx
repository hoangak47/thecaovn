"use client";

import logo from "@/assets/images/logo.png";
import "./style.css";
import usePath from "@/component/usePath";

const menuItems = [
  {
    title: "QUẢN LÝ SẢN PHẨM",
    items: [
      { name: "Danh mục sản phẩm", link: "/admin/danh-muc" },
      { name: "Sản phẩm", link: "/admin/san-pham" },
    ],
  },
  {
    title: "QUẢN LÝ BÀI VIẾT",
    items: [
      { name: "Giới thiệu", link: "/admin/gioi-thieu" },
      { name: "Tin tức", link: "/admin/tin-tuc" },
      { name: "Tiêu chí", link: "/admin/tieu-chi" },
    ],
  },
  {
    title: "QUẢN LÝ HÌNH ẢNH",
    items: [
      { name: "Slide", link: "/admin/slide" },
      { name: "Đối tác", link: "/admin/doi-tac" },
      { name: "Khách hàng", link: "/admin/khach-hang" },
    ],
  },
  {
    title: "QUẢN LÝ TRANG",
    items: [{ name: "Liên hệ", link: "/admin/lien-he" }],
  },
];

export default function AdminClientLayout({ children }) {
  const path = usePath();

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md overflow-y-auto">
        <div className="p-4">
          <img className="mx-auto w-32 md:w-40" src={logo.src} alt="The Cao" />
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map((menu, index) => (
              <li key={index} className="px-4 py-2 text-red-500 font-bold">
                {menu.title}
                <ul className="mt-2">
                  {menu.items.map((item, idx) => (
                    <li
                      key={idx}
                      className={`pl-6 py-1 hover:bg-gray-100 ${
                        path.includes(item.link.split("/").pop())
                          ? "bg-gray-200"
                          : ""
                      }`}
                    >
                      <a
                        className="text-gray-600 text-base font-medium hover:text-red-500 block"
                        href={item.link}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto relative ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white shadow p-4 rounded">
          <div className="flex items-center">
            <span className="mr-2">Xin chào: Administrator</span>
            <i className="fas fa-banana"></i>
          </div>
          <div className="flex items-center">
            <a href="/" target="_blank" className="text-gray-600">
              🏠
            </a>
          </div>
        </div>
        <main
          className="flex-1 overflow-y-auto focus:outline-none"
          tabIndex={0}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
