import React from "react";
import { getData } from "./getdata";

export default async function TieuChi() {
  const rate = await getData();
  return (
    <section className="flex flex-col mt-32 xl:px-28 px-4">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {rate?.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] overflow-hidden bg-white rounded-2xl p-5 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="object-contain aspect-square my-6 invert h-24 w-24"
            />
            <div className="flex items-center justify-center flex-1 mt-3">
              <h2 className="text-center text-4xl font-medium mt-1 uppercase mb-6 text-[var(--color-primary)]">
                {item.title}
              </h2>
            </div>
            <p className="text-left text-base mb-3 text-[var(--color-primary)] px-3">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
