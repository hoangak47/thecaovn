"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import React from "react";

export default function Suggestion() {
  const { products } = useGlobalContext();
  return (
    <div className="flex-[12] md:flex-[3]">
      <div className="border-[1px] border-gray-300 sticky top-0 h-screen overflow-y-scroll">
        <h1 className="text-xl font-semibold mb-8 underline text-center mt-3">
          TẤT CẢ SẢN PHẨM
        </h1>
        {products?.map((item, index) => {
          return (
            <Link
              href={`${item.url}`}
              key={index}
              className="px-4 py-2 flex items-center cursor-pointer product-item"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-w-16 aspect-square"
              />
              <h2 className="text-sm font-semibold mb-2 text-[var(--color-gray)] ml-4 line-clamp-3 hover:text-[var(--color-primary)]">
                {item.title}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
