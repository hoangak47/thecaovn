import React, { useEffect, useState } from "react";

import LegacyCKEditor from "@/component/admin/LegacyCKEditor";
import NoImage from "@/assets/images/noimage.png";
import ImageUploader from "@/component/admin/ImageUploader";

export default function RenderMainContentFields({
  data,
  setData,
  handleChange,
}) {
  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    setEditorReady(true);
  }, []);
  return (
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
          {editorReady && (
            <>
              <div>
                <label className="block mb-1 font-normal text-[#6c757d]">
                  Mô tả (vi):
                </label>
                <LegacyCKEditor
                  key="short_description"
                  id="editor1"
                  onChange={handleChange("short_description")}
                  placeholder="Mô tả (vi)"
                  value={data.short_description}
                />
              </div>
              <div>
                <label className="block mb-1 font-normal text-[#6c757d]">
                  Nội dung (vi):
                </label>
                <LegacyCKEditor
                  key="description"
                  id="editor2"
                  onChange={handleChange("description")}
                  placeholder="Nội dung (vi)"
                  value={data.description}
                />
              </div>
            </>
          )}
        </form>
      </div>
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded border border-gray-200 p-4 shadow-sm relative">
          <div className="text-xs font-normal text-[#3a3a3a] mb-3">
            Hình ảnh
          </div>
          <img
            alt={data.title}
            className="w-full rounded border border-gray-200 mb-3"
            height="200"
            src={data.image || NoImage.src}
            width="300"
          />
          <ImageUploader
            url={data.image}
            onChange={(url) => setData((prev) => ({ ...prev, image: url }))}
          />
        </div>
      </div>
    </div>
  );
}
