"use client";

import React from "react";
import usePath from "../usePath";

export default function HandleAction() {
  const path = usePath();
  return (
    <section className="bg-white rounded-lg shadow-md mb-6 p-4 flex flex-wrap gap-3">
      <a
        className="flex items-center gap-2 bg-[#2bbf6e] hover:bg-[#27a85a] text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
        type="button"
        href={`/admin/${path[path.length - 1]}/add`}
      >
        <i className="fas fa-plus"></i>
        Thêm mới
      </a>
      <button
        className="flex items-center gap-2 bg-[#c32127] hover:bg-[#a31a20] text-white font-semibold py-2 px-4 rounded-md"
        type="button"
      >
        <i className="fas fa-trash-alt"></i>
        Xóa tất cả
      </button>
    </section>
  );
}
