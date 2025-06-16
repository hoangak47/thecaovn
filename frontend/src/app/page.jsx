"use client";
import { SVGnext } from "@/assets/svg";
import Link from "next/link";
import NoImage from "@/assets/images/noimage.png";

import "./globals.css";
import React from "react";
import Image from "next/image";
export default function Home() {
  // return <LegacyCKEditor />;
  return <GioiThieu />;
}

function GioiThieu() {
  const [data, setData] = React.useState({
    title: "",
    short_description: "",
    description: "",
    image: NoImage.src,
    SEO_title: "",
    SEO_description: "",
    SEO_keywords: "",
    SEO_image: NoImage.src,
    schema: "",
  });

  React.useEffect(() => {
    fetch("http://localhost:5000/gioi-thieu")
      .then((response) => response.json())
      .then((result) => {
        setData({
          title: result.title || "",
          short_description: result.short_description || "",
          description: result.description || "",
          image: result.image || NoImage.src,
          SEO_title: result.SEO_title || "",
          SEO_description: result.SEO_description || "",
          SEO_keywords: result.SEO_keywords || "",
          SEO_image: result.SEO_image || NoImage.src,
          schema: result.schema || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Lỗi khi tải dữ liệu!");
      });
  }, []);

  return (
    <div className="flex md:flex-row flex-col">
      <div className="flex-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] overflow-hidden p-6">
        <img
          src={data.image || NoImage.src}
          alt={data.title || "No Image"}
          className="w-full h-full rounded-2xl object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="flex-1 flex flex-col p-5">
        <div
          dangerouslySetInnerHTML={{ __html: data.short_description || "" }}
        ></div>

        <div className="flex justify-center">
          <figure className="flex-1 p-1">
            <Image
              src={require("@/assets/images/mau-beo-go.jpg")}
              alt="mau-beo-go"
              className="h-full"
              width={500}
              height={500}
            />
          </figure>
          <figure className="flex-1 p-1">
            <Image
              src={require("@/assets/images/mau-bang-tai-cua.jpg")}
              alt="mau-bang-tai-cua"
              className="h-full"
              width={500}
              height={500}
            />
          </figure>
          <figure className="flex-1 p-1">
            <Image
              src={require("@/assets/images/mau-xich-nhua.jpg")}
              alt="mau-xich-nhua"
              className="h-full"
              width={500}
              height={500}
            />
          </figure>
        </div>
        <div className="flex-1 flex align-items-center justify-end mt-5">
          <Link
            href="/gioi-thieu"
            className="text-md font-normal [color:var(--color-primary)] py-3 px-6 [border-color:var(--color-primary)] border rounded-md flex items-center justify-center hover:[background-color:var(--color-primary)] hover:text-white transition-all duration-300 ease-in-out"
          >
            Xem thêm
            <SVGnext height="1.5em" width="1.5em" fill="currentColor" />
          </Link>
        </div>
      </div>
    </div>
  );
}
