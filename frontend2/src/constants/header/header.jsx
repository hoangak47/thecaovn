"use client";

import Image from "next/image";
import React from "react";
import "./header.css";
import { usePathname } from "next/navigation";
import { SVGmenu } from "@/assets/svg";
import axios from "axios";
import Link from "next/link";

const defaultMenu = [
  {
    title: "Trang chủ",
    link: "/",
  },
  {
    title: "Giới thiệu",
    link: "/gioi-thieu",
  },
  {
    title: "Sản phẩm",
    link: "/san-pham",
  },
  {
    title: "Ngành nghề",
    link: "/nganh-nghe",
  },
  {
    title: "Gia Công",
    link: "/gia-cong",
  },
  {
    title: "Tin tức",
    link: "/tin-tuc",
  },
  {
    title: "Liên hệ",
    link: "/lien-he",
  },
];

export default function Header() {
  const currentPath = usePathname();
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState(defaultMenu);

  React.useEffect(() => {
    async function getCategoryMenu() {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${url}danh-muc`);
        const data = response.data;

        const updatedMenu = defaultMenu.map((item) => {
          const cleanLink = item.link.replace(/^\//, "");

          const children = data
            .filter((d) => d.parent_category === cleanLink)
            .map((d) => ({ title: d.title, link: `/${d.url}` }));

          return children.length > 0 ? { ...item, children } : item;
        });

        setMenu(updatedMenu);
      } catch (error) {
        setMenu(defaultMenu);
      }
    }

    getCategoryMenu();
  }, []);

  return (
    <nav className="bg-white border-gray-200 relative xl:px-28 px-4">
      <div className="flex flex-wrap md:items-center justify-between mx-auto md:px-11 py-5 px-4  md:flex-row flex-col">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={require("@/assets/images/logo.png")}
            alt="The Cao"
            width={300}
          />
        </a>
        <div
          onClick={() => setOpen(!open)}
          className="flex md:hidden border-2 p-2 rounded-md cursor-pointer absolute top-4 right-4 z-50"
        >
          <SVGmenu width="30" height="30" fill="#000" />
        </div>
        <div
          className={`md:flex flex-col md:w-auto flex-1 items-end ps-4 md:visible md:opacity-100 ${
            open ? "visible opacity-100 flex" : "invisible opacity-0 hidden"
          }`}
        >
          <div className="flex text-[#9e9e9e] w-full justify-end  border-b border-[#e2e8f0] text-sm p-2">
            <a href="tel:+84788388588" className="mr-2">
              0788 388 588
            </a>
            <a href="#" className="text-black mr-2 underline">
              VN
            </a>
            <p className="mr-2">/</p>
            <a href="#" className="mr-2">
              EU
            </a>
            <p className="mr-2">/</p>
            <a href="#" className="mr-2">
              CN
            </a>
          </div>
          <div className="flex md:flex-row flex-col w-full justify-end">
            {menu?.map((item, index) => {
              return (
                <div className="p-2 ml-3 text-md dropdown" key={index}>
                  <a
                    href={item.link}
                    className={`nav-link position-relative dropdown-toggle text-nowrap text-lg  text-[#9e9e9e] ${
                      currentPath === item.link ||
                      currentPath.split("/")[1] === item.nav ||
                      item.children?.find((child) => child.link === currentPath)
                        ? "active text-black"
                        : ""
                    }`}
                  >
                    {item.title}
                  </a>
                  <ul className="dropdown-menu bg-white overflow-hidden">
                    {item?.children?.map((child) => {
                      return (
                        <li
                          key={child.link}
                          className="py-1  p-2 hover:bg-gray-100"
                        >
                          <Link href={child.link} className="dropdown-item">
                            {child.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
