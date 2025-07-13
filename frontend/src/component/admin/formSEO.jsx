import React from "react";
import { stripHTML } from "../stripHTML";

export default function FormSEO({ data, setData, handleChange }) {
  const handleAutoGenerateSEO = () => {
    setData((prev) => ({
      ...prev,
      SEO_title: prev?.title,
      SEO_description: /<[^>]+>/.test(prev?.short_description)
        ? stripHTML(prev?.short_description)
        : prev?.short_description,
      SEO_keywords: prev?.title,
      SEO_image: prev?.image,
    }));
  };
  return (
    <div className="bg-white rounded border border-gray-200 p-4 shadow-sm relative">
      <div className="flex justify-between items-center mb-3 text-xs font-normal text-[#3a3a3a]">
        <div>Nội dung SEO</div>
        <button
          className="bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold px-3 py-1 rounded"
          type="button"
          onClick={handleAutoGenerateSEO}
        >
          Tạo SEO
        </button>
      </div>
      <form className="space-y-4 text-xs text-[#6c757d]">
        <div>
          <label className="block mb-1 font-normal text-[#6c757d]">
            SEO Title:{" "}
            <span className="font-bold text-[#3a3a3a]">
              {data?.SEO_title?.length || "0"}/70 ký tự
            </span>
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="SEO Title (vi)"
            type="text"
            value={data?.SEO_title}
            onChange={(e) => handleChange("SEO_title")(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-normal text-[#6c757d]">
            SEO Keywords:{" "}
            <span className="font-bold text-[#3a3a3a]">
              {data?.SEO_keywords?.length || "0"}/70 ký tự
            </span>
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="SEO Keywords (vi)"
            value={data?.SEO_keywords}
            type="text"
            onChange={(e) => handleChange("SEO_keywords")(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-normal text-[#6c757d]">
            SEO Description:{" "}
            <span className="font-bold text-[#3a3a3a]">
              {data?.SEO_description?.length || "0"}/160 ký tự
            </span>
          </label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
            placeholder="SEO Description (vi)"
            rows="3"
            value={data?.SEO_description}
            onChange={(e) => handleChange("SEO_description")(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
