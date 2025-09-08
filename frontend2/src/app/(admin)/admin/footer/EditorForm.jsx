"use client";

import React, { useState, useEffect } from "react";
import HandleAction from "@/component/admin/handleActionContent";
import LegacyCKEditor from "@/component/admin/LegacyCKEditor";

export default function EditorForm({ initialData = {} }) {
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
            url={`${url}footer`}
            data={data}
            goback={false}
            id={data?.id || null}
          />

          <label className="block mb-1 font-normal text-[#6c757d]">
            Địa chỉ (vi)
          </label>
          <LegacyCKEditor
            key="address"
            id="address"
            onChange={handleChange("address")}
            placeholder="Địa chỉ (vi)"
            value={data?.address || ""}
            disableImageUpload
            height={200} // chiều cao px
          />

          <label className="block mb-1 font-normal text-[#6c757d]">
            Liên hệ (vi)
          </label>
          <LegacyCKEditor
            key="contact"
            id="contact"
            onChange={handleChange("contact")}
            placeholder="Liên hệ (vi)"
            value={data?.contact || ""}
            disableImageUpload
            height={200} // chiều cao px
          />

          <label className="block mb-1 font-normal text-[#6c757d]">
            Hotline (vi)
          </label>
          <LegacyCKEditor
            key="hotline"
            id="hotline"
            onChange={handleChange("hotline")}
            placeholder="Hotline (vi)"
            value={data?.hotline || ""}
            disableImageUpload
            height={200} // chiều cao px
          />

          <HandleAction
            initialData={initialData}
            setData={setData}
            url={`${url}footer`}
            data={data}
            goback={false}
            id={data?.id || null}
          />
        </div>
      </div>
    </div>
  );
}
