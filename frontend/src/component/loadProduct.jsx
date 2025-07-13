import Link from "next/link";
import React from "react";

async function getSanPham({ search }) {
  console.log(search);
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${url}danh-muc?search=${search}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function LoadProduct({ title, search, limit = null }) {
  const data = await getSanPham({ search: search });
  const productsToShow = limit ? data.slice(0, limit) : data;
  if (!data) {
    return;
  }
  return (
    <section className="flex flex-col xl:px-28 px-4 mt-10">
      <h1 className="text-4xl font-medium mt-5 text-center m-5">
        {data.length > 0 ? title : ""}
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {productsToShow.map((product, index) => (
          <Link
            href={product.url}
            key={index}
            className="flex-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] overflow-hidden bg-white rounded-2xl p-2 flex flex-col hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="object-cover aspect-square rounded-lg w-full h-full"
              loading="lazy"
            />
            <div className="flex items-center justify-center flex-1 mt-3">
              <h2 className="text-center text-xl font-medium mt-1 line-clamp-2">
                {product.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
