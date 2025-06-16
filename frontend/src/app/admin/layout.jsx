"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.png";

import "./style.css";

export default function LayoutAdmin({ children }) {
  return (
    // <>
    //   {/* <meta charSet="utf-8" />
    //   <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    //   <title>Product Management</title>
    //   <link
    //     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    //     rel="stylesheet"
    //   /> */}

    // </>
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md overflow-y-auto">
        <div className="p-4">
          <Image className="mx-auto" src={logo} alt="The Cao" width={150} />
        </div>
        <nav className="mt-6">
          <ul>
            <li className="px-4 py-2 text-red-500 font-bold">
              QUẢN LÝ SẢN PHẨM
            </li>
            <li className="px-4 py-2">
              <a className="flex items-center text-red-500" href="#">
                <i className="fas fa-box mr-2"></i>
                Sản phẩm
              </a>
              <ul className="ml-6 mt-2">
                <li className="py-1">
                  <a className="text-gray-600" href="/admin/PVC">
                    PVC
                  </a>
                </li>
                <li className="py-1">
                  <a className="text-gray-600" href="/admin/PU">
                    PU
                  </a>
                </li>
                <li className="py-1">
                  <a className="text-gray-600" href="/admin/TPU">
                    TPU
                  </a>
                </li>
              </ul>
            </li>
            <li className="px-4 py-2 text-red-500 font-bold">
              QUẢN LÝ BÀI VIẾT
            </li>
            <li className="px-4 py-2">
              <a className="text-gray-600" href="/admin/gioi-thieu">
                Giới thiệu
              </a>
            </li>
            <li className="px-4 py-2">
              <a className="text-gray-600" href="/admin/news">
                Tin tức
              </a>
            </li>
            <li className="px-4 py-2">
              <a className="text-gray-600" href="/admin/content">
                Bài viết
              </a>
            </li>
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
