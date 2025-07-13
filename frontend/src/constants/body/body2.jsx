"use client";

import { products } from "@/app/page";
import Image from "next/image";
import React from "react";

import "./style.css";
import Link from "next/link";

export default function Body_({ children }) {
  return (
    <div className="container mx-auto xl:px-28 py-16">
      <div className="flex gap-4 md:flex-row flex-col-reverse">
        <div className="flex-[12] md:flex-[3]">
          <div className="border-[1px] border-gray-300 sticky top-0">
            <h1 className="text-xl font-semibold mb-8 underline text-center">
              TẤT CẢ SẢN PHẨM
            </h1>
            {products?.map((item, index) => {
              return (
                <Link
                  href={`${item.url}`}
                  key={index}
                  className="px-4 py-2 flex items-center cursor-pointer product-item"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-w-16 aspect-square"
                    width={500}
                    height={500}
                  />
                  <h2 className="text-sm font-semibold mb-2 text-[--color-gray] ml-4 line-clamp-3">
                    {item.title}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex-[12] md:flex-[9] py-4 px-4">{children}</div>
      </div>
    </div>
  );
}
