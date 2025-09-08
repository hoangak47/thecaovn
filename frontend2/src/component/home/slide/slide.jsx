"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Link from "next/link";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import NoImage from "@/assets/images/noimage.png";

export default function Slide({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src={NoImage}
          alt="No Image"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {data.map((slide, index) => (
        <SwiperSlide key={index}>
          <Link href={slide.link || "#"}>
            <img
              src={slide.image || NoImage.src}
              alt={slide.title || "No Image"}
              className="w-full h-[80vh] object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-bold text-red-600 opacity-0 animate-slide-up">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-900 mt-4 opacity-0 animate-slide-up">
                {slide.slogan}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
