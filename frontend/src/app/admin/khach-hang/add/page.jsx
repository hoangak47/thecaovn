"use client";

import React, { useState, useEffect } from "react";
import HandleAction from "@/component/admin/handleActionContent";
import ImageUploader from "@/component/admin/ImageUploader";
import axios from "axios";

export default function EditorForm({ id = null }) {
  const [data, setData] = useState({
    title: "",
    image: "",
  });

  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (id) {
      const response = axios.get(`${url}khach-hang/${id}`);
      response
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu:", error);
        });
    }
  }, [id]);

  // Đảm bảo editor load sau khi render hoàn chỉnh

  const handleChange = (key) => (value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="bg-[#f8f9fc] text-[#3a3a3a] font-sans text-sm leading-relaxed overflow-y-auto">
      <div className="min-h-screen flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <HandleAction
            setData={setData}
            url={`${url}khach-hang`}
            data={data}
            id={id}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9 bg-white rounded border border-gray-200 p-4 shadow-sm">
              <form className="mt-3 space-y-4 text-xs text-[#6c757d]">
                <div>
                  <label
                    className="block mb-1 font-normal text-[#6c757d]"
                    htmlFor="title"
                  >
                    Tiêu đề (vi):
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-[#6c757d]"
                    value={data.title}
                    id="title"
                    placeholder="Tiêu đề (vi)"
                    type="text"
                    onChange={(e) => handleChange("title")(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <ImageUploader
                url={data.image}
                title={data.title}
                onChange={(url) => setData((prev) => ({ ...prev, image: url }))}
              />
            </div>
          </div>

          <HandleAction
            setData={setData}
            url={`${url}khach-hang`}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
