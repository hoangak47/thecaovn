"use client";

import HandleAction from "@/component/admin/handleAction";
import axios from "axios";
import React from "react";

export default function page() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const response = axios.get(`${process.env.NEXT_PUBLIC_API_URL}danh-muc`);
    response
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        setData([]);
      });
  }, []);
  if (!data) {
    return <div className="text-red-500">Không có dữ liệu</div>;
  }

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa dữ liệu này?")) {
      return;
    }

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}danh-muc/${id}`)
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
                Danh mục
              </th>
              <th className="px-4 py-3 text-center font-semibold uppercase tracking-widest w-28">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-50"
                key={item.id}
              >
                <td className="border-r border-gray-200 px-4 py-3 text-center">
                  <input
                    className="w-14 text-center rounded-md border border-gray-300 py-1 text-xs text-[#5a5c6c] focus:outline-none focus:ring-2 focus:ring-[#c32127] focus:border-[#c32127]"
                    min={0}
                    type="number"
                    defaultValue={0}
                  />
                </td>
                <td className="border-r border-gray-200 px-4 py-3">
                  {item.title || ""}
                </td>
                <td className="border-r border-gray-200 px-4 py-3 text-center">
                  <img
                    alt={item.title || "No title"}
                    className="inline-block"
                    height={30}
                    loading="lazy"
                    src={item.image || "/no-image.png"}
                    width={80}
                  />
                </td>

                <td className="border-r border-gray-200 px-4 py-3 text-center">
                  {item?.parent_category || ""}
                </td>
                <td className="px-4 py-3 text-center space-x-4 text-[#c32127]">
                  <a
                    aria-label="Edit row 1"
                    className="hover:text-[#a31a20]"
                    href={`/admin/danh-muc/${item.id}`}
                  >
                    <i className="fas fa-pen"></i>
                  </a>
                  <button
                    aria-label="Delete row 1"
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
      <HandleAction />
    </>
  );
}
