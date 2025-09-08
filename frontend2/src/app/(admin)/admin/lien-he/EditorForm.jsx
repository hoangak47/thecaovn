"use client";

import React, { useState, useEffect } from "react";
import HandleAction from "@/component/admin/handleActionContent";
import RenderMainContentFields from "@/component/admin/renderMainContentFields";

export default function EditorForm({ initialData }) {
  const [data, setData] = useState(initialData);

  // Đảm bảo editor load sau khi render hoàn chỉnh

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
            url={`${url}lien-he`}
            data={data}
            goback={false}
          />

          <RenderMainContentFields
            data={data}
            setData={setData}
            handleChange={handleChange}
            url={false}
            short_description={false}
          />

          <HandleAction
            initialData={initialData}
            setData={setData}
            url={`${url}lien-he`}
            data={data}
            goback={false}
          />
        </div>
      </div>
    </div>
  );
}
