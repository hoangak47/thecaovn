import { SVGnext } from "@/assets/svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoImage from "@/assets/images/noimage.png";

import maubeogo from "@/assets/images/mau-beo-go.jpg";
import maubangtaicua from "@/assets/images/mau-bang-tai-cua.jpg";
import mauxichnhua from "@/assets/images/mau-xich-nhua.jpg";

const images = [maubeogo, maubangtaicua, mauxichnhua];

export default function GioiThieu({ data }) {
  if (!data || !data.title) {
    return (
      <div className="flex md:flex-row flex-col xl:px-28 px-4 mt-10">
        <div className="flex-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] overflow-hidden p-6">
          <div className="w-full h-64 md:h-96 rounded-2xl bg-gray-300 animate-pulse"></div>
        </div>
        <div className="flex-1 flex flex-col p-5 space-y-3">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="h-4 bg-gray-300 rounded animate-pulse w-4/6"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col xl:px-28 px-4 mt-10">
      <div className="flex-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] overflow-hidden p-6">
        <img
          src={data.image || NoImage.src}
          alt={data.title}
          className="w-full h-full rounded-2xl"
        />
      </div>
      <div className="flex-1 flex flex-col p-5">
        <div
          dangerouslySetInnerHTML={{ __html: data.short_description || "" }}
        />
        <div className="flex justify-center">
          {images.map((image, idx) => (
            <figure className="flex-1 p-1" key={idx}>
              <Image
                className="w-full h-full object-cover rounded-lg"
                src={image}
                alt={`Mẫu ${idx + 1}`}
              />
            </figure>
          ))}
        </div>
        <div className="flex justify-end mt-5">
          <Link
            href="/gioi-thieu"
            className="text-md font-normal [color:var(--color-primary)] py-3 px-6 border rounded-md flex items-center justify-center hover:[background-color:var(--color-primary)] hover:text-white transition-all duration-300"
          >
            Xem thêm
            <SVGnext height="1.5em" width="1.5em" fill="currentColor" />
          </Link>
        </div>
      </div>
    </div>
  );
}
