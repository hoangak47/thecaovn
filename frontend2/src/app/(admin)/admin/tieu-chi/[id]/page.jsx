"use client";

import React, { useState, useEffect } from "react";
import HandleAction from "@/component/admin/handleActionContent";
import ImageUploader from "@/component/admin/ImageUploader";
import axios from "axios";

import { use } from "react";

export default function EditorForm({ params }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (id) {
      axios
        .get(`${url}tieu-chi/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData({ title: "", description: "", image: "" });
        });
    }
  }, [id]);

  const handleChange = (key) => (value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-[#f8f9fc] text-[#3a3a3a] font-sans text-sm leading-relaxed overflow-y-auto">
      <div className="min-h-screen flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <h1 className="text-xl font-semibold text-[#3a3a3a]">
            Chỉnh sửa tiêu chí
          </h1>

          <HandleAction
            setData={setData}
            url={`${url}tieu-chi/${id}`}
            data={data}
            id={id}
            isEdit={true}
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
                <div>
                  <label
                    className="block mb-1 font-normal text-[#6c757d]"
                    htmlFor="description"
                  >
                    Mô tả (vi):
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-[#6c757d]"
                    value={data.description}
                    id="description"
                    placeholder="Mô tả (vi)"
                    rows={6}
                    onChange={(e) =>
                      handleChange("description")(e.target.value)
                    }
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
            url={`${url}tieu-chi/${id}`}
            data={data}
            id={id}
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
}
