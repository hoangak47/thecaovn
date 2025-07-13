"use client";

import React, { useEffect, useState } from "react";

import LegacyCKEditor from "@/component/admin/LegacyCKEditor";
import ImageUploader from "@/component/admin/ImageUploader";
import { slugify } from "../slugify";

export default function RenderMainContentFields({
  data,
  setData,
  handleChange,
  short_description = true,
  description = true,
  url = true,
  children,
  short_description_input = "input",
}) {
  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    setEditorReady(true);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <div className="lg:col-span-9 bg-white rounded border border-gray-200 p-4 shadow-sm">
        <form className="mt-3 space-y-4 text-xs text-[#6c757d]">
          {url && (
            <div>
              <label
                className="block mb-1 font-normal text-[#6c757d]"
                htmlFor="url"
              >
                Đường dẫn mẫu (vi):
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-[#6c757d]"
                value={data?.url || slugify(data?.title || "")}
                id="url"
                placeholder="Đường dẫn mẫu (vi)"
                type="text"
                disabled
              />
            </div>
          )}
          <div>
            <label
              className="block mb-1 font-normal text-[#6c757d]"
              htmlFor="title"
            >
              Tiêu đề (vi):
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-[#6c757d]"
              value={data?.title || ""}
              id="title"
              placeholder="Tiêu đề (vi)"
              type="text"
              onChange={(e) => {
                handleChange("title")(e.target.value);
                handleChange("url")(slugify(e.target.value));
              }}
            />
          </div>
          {editorReady && (
            <>
              {short_description && (
                <div>
                  <label className="block mb-1 font-normal text-[#6c757d]">
                    Mô tả (vi):
                  </label>

                  {short_description_input === "input" ? (
                    <textarea
                      className="w-full border border-gray-300 rounded px-3 py-2 resize-none text-xs text-[#6c757d]"
                      value={data?.short_description || ""}
                      rows="5"
                      id="short_description"
                      placeholder="Mô tả (vi)"
                      onChange={(e) =>
                        handleChange("short_description")(e.target.value)
                      }
                    />
                  ) : (
                    <LegacyCKEditor
                      key="short_description"
                      id="editor1"
                      onChange={handleChange("short_description")}
                      placeholder="Mô tả (vi)"
                      value={data?.short_description || ""}
                    />
                  )}
                </div>
              )}
              {description && (
                <div>
                  <label className="block mb-1 font-normal text-[#6c757d]">
                    Nội dung (vi):
                  </label>
                  <LegacyCKEditor
                    key="description"
                    id="editor2"
                    onChange={handleChange("description")}
                    placeholder="Nội dung (vi)"
                    value={data?.description}
                  />
                </div>
              )}
            </>
          )}
        </form>
      </div>
      <div className="lg:col-span-3 space-y-6">
        <ImageUploader
          url={data?.image}
          title={data?.title}
          onChange={(url) => setData((prev) => ({ ...prev, image: url }))}
        />

        {children}
      </div>
    </div>
  );
}
