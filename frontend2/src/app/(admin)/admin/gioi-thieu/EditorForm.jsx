"use client";

import React, { useState, useEffect } from "react";
import { createSchema } from "@/component/admin/createSchema";
import HandleAction from "@/component/admin/handleActionContent";
import FormSchema from "@/component/admin/formSchema";
import FormSEO from "@/component/admin/formSEO";
import RenderMainContentFields from "@/component/admin/renderMainContentFields";

export default function EditorForm({ initialData }) {
  const [data, setData] = useState(initialData);

  // Cập nhật schema nếu không có sẵn
  useEffect(() => {
    if (!initialData.schema) {
      createSchema(initialData).then((schema) => {
        setData((prev) => ({
          ...prev,
          schema: JSON.stringify(schema, null, 2),
        }));
      });
    }
  }, [initialData]);

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
            url={`${url}gioi-thieu`}
            data={data}
            goback={false}
            id={"gioi-thieu"}
          />

          <RenderMainContentFields
            data={data}
            setData={setData}
            handleChange={handleChange}
            url={false}
            short_description_input="t"
          />

          <FormSEO data={data} setData={setData} handleChange={handleChange} />
          <FormSchema
            data={data}
            setData={setData}
            handleChange={handleChange}
          />
          <HandleAction
            initialData={initialData}
            setData={setData}
            url={`${url}gioi-thieu`}
            data={data}
            goback={false}
            id={"gioi-thieu"}
          />
        </div>
      </div>
    </div>
  );
}
