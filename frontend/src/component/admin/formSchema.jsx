import React from "react";
import { createSchema } from "./createSchema";

export default function FormSchema({ data, setData, handleChange }) {
  const handleGenerateSchema = () => {
    createSchema(data).then((schema) => {
      if (!schema) {
        return;
      }
      const formatted = JSON.stringify(schema, null, 2);
      setData((prev) => ({
        ...prev,
        schema: formatted,
      }));
    });
  };

  return (
    <div className="bg-white rounded border border-gray-200 p-4 shadow-sm relative">
      <div className="flex justify-between items-center mb-3 text-xs font-normal text-[#3a3a3a]">
        <div>Schema</div>
        <button
          className="bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold px-3 py-1 rounded"
          type="button"
          onClick={handleGenerateSchema}
        >
          Tạo Schema
        </button>
      </div>
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2 resize-none font-mono"
        placeholder="Schema JSON-LD"
        rows="10"
        value={data?.schema}
        onChange={(e) => handleChange("schema")(e.target.value)}
      />
    </div>
  );
}
