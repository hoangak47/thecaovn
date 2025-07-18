"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

export default function KhachHang() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${url}khach-hang`, {
          cache: "no-store",
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        setData([]);
      }
    };

    getData();
  }, []); // đảm bảo chỉ gọi 1 lần khi mount

  return (
    <section className="flex flex-col mt-20 xl:px-28 px-4">
      <h1 className="md:block hidden">
        <p className="text-2xl md:text-4xl font-medium mt-5 text-center m-5">
          Khách hàng của{" "}
          <span className="text-[var(--color-primary)]">Thế Cao</span>
        </p>
      </h1>
      <Swiper
        slidesPerView={5}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay]}
        loop={data.length > 4}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.image}
              alt={item.title || "Khách hàng"}
              loading="lazy"
              className="w-full h-full object-contain rounded-lg"
              style={{ height: "100px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
