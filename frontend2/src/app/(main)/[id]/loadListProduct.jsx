import Link from "next/link";
import React from "react";

export default function LoadListProduct({ sanPham, className = "", max = 5 }) {
  return (
    <div
      className={`grid grid-cols-2 ${
        max ? `md:grid-cols-${max}` : "md:grid-cols-5"
      } gap-4 ${className}`}
    >
      {Array.isArray(sanPham) &&
        sanPham?.map((item) => (
          <Link
            href={`/${item.url}`}
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <img
              src={
                item.image && item.image.trim() !== ""
                  ? item.image
                  : NoImage.src
              }
              alt={item.title || "Sản phẩm"}
              className="w-full h-40 md:h-56 object-cover bg-gray-200"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
    </div>
  );
}
