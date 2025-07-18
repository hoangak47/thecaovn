"use client";

import React, { useState, useEffect } from "react";
import { createSchema } from "@/component/admin/createSchema";
import HandleAction from "@/component/admin/handleActionContent";
import LegacyCKEditor from "@/component/admin/LegacyCKEditor";

export default function EditorForm({ initialData }) {
  const [data, setData] = useState(initialData);

  const handleChange = (key) => (value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const url = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="bg-[#f8f9fc] text-[#3a3a3a] font-sans text-sm leading-relaxed overflow-y-auto">
      <div className="min-h-screen flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <HandleAction
            initialData={initialData}
            setData={setData}
            url={`${url}gioi-thieu`}
            data={data}
          />

          {/* <RenderMainContentFields
            data={data}
            setData={setData}
            handleChange={handleChange}
            url={false}
            short_description_input="t"
            haveUploadImage={false}
          /> */}

          <LegacyCKEditor
            key="short_description"
            id="editor1"
            // onChange={handleChange("short_description")}
            placeholder="Mô tả (vi)"
            value={data?.short_description || ""}
          />

          <HandleAction
            initialData={initialData}
            setData={setData}
            url={`${url}gioi-thieu`}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
