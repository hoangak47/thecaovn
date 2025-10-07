import React from "react";
import { getData } from "./getdata";

export default async function TieuChi() {
  const rate = await getData();

  return (
    <section className="flex flex-col mt-16 sm:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {rate?.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="object-contain aspect-square my-4 sm:my-6 h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 invert"
            />
            <div className="flex items-center justify-center flex-1">
              <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-medium uppercase text-[var(--color-primary)] mb-4 sm:mb-6">
                {item.title}
              </h2>
            </div>
            <p className="text-center sm:text-left text-sm sm:text-base text-[var(--color-primary)] px-2 sm:px-3">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
