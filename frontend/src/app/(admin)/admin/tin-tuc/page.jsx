"use client";

import React from "react";
import HandleAction from "@/component/admin/handleAction";
import axios from "axios";
import { stripHTML } from "@/component/stripHTML";
export default function page() {
  const [data, setData] = React.useState([]);

  const url = process.env.NEXT_PUBLIC_API_URL;
  const url_request = "tin-tuc";

  React.useEffect(() => {
    const response = axios.get(`${url}${url_request}`);
    response
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setData([]);
      });
  }, []);
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa dữ liệu này?")) {
      return;
    }

    axios
      .delete(`${url}${url_request}/${id}`)
      .then(() => {
        alert("Xóa dữ liệu thành công");
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        alert("Lỗi khi xóa dữ liệu");
      });
  };

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        rel="stylesheet"
      />
      <h1 className="text-lg font-semibold mb-6">Quản lý/Slideshow</h1>
      <HandleAction />
      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-sm">Không có dữ liệu nào để hiển thị.</p>
          <p className="text-xs">Hãy thêm dữ liệu mới để bắt đầu.</p>
        </div>
      ) : (
        <section className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border-collapse border border-gray-200 text-xs text-[#5a5c6c]">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="border-r border-gray-200 px-4 py-3 text-left font-semibold uppercase tracking-widest w-20">
                  STT
                </th>
                <th className="border-r border-gray-200 px-4 py-3 text-left font-semibold uppercase tracking-widest w-40">
                  Tiêu đề
                </th>
                <th className="border-r border-gray-200 px-4 py-3 text-center font-semibold uppercase tracking-widest w-28">
                  Hình ảnh
                </th>
                <th className="border-r border-gray-200 px-4 py-3 text-center font-semibold uppercase tracking-widest w-40">
                  Mô tả
                </th>
                <th className="px-4 py-3 text-center font-semibold uppercase tracking-widest w-28">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="border-r border-gray-200 px-4 py-3 text-center">
                    <input
                      className="w-14 text-center rounded-md border border-gray-300 py-1 text-xs text-[#5a5c6c] focus:outline-none focus:ring-2 focus:ring-[#c32127] focus:border-[#c32127]"
                      min={0}
                      type="number"
                      defaultValue={item.order}
                    />
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3">
                    {item.title}
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-center">
                    <img
                      alt="Slide image showing a dark background with a person and text"
                      className="inline-block"
                      height={30}
                      loading="lazy"
                      src={item.image}
                      width={80}
                    />
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3">
                    {stripHTML(item.short_description) || "Chưa có mô tả"}
                  </td>
                  <td className="px-4 py-3 text-center space-x-4 text-[#c32127]">
                    <a
                      aria-label={`Edit row ${index + 1}`}
                      className="hover:text-[#a31a20]"
                      href={`/admin/${url_request}/${item.id}`}
                    >
                      <i className="fas fa-pen"></i>
                    </a>
                    <button
                      aria-label={`Delete row ${index + 1}`}
                      className="hover:text-[#a31a20]"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      <HandleAction />
    </>
  );
}
