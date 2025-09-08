"use client";

import { useState, useRef } from "react";

export default function ImageGallery({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const imageRef = useRef(null);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev > 0 ? prev - 1 : data.multiple_image.length - 1
    );
    setZoomStyle({});
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev < data.multiple_image.length - 1 ? prev + 1 : 0
    );
    setZoomStyle({});
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)", // có thể chỉnh scale lớn hơn nếu muốn
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  const closeModal = () => {
    setActiveIndex(null);
    setZoomStyle({});
  };

  return (
    <>
      {/* Thumbnails */}
      {data?.multiple_image?.length > 0 && (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.multiple_image.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 border border-gray-300 rounded-md overflow-hidden max-w-[500px] relative"
            >
              <div
                onClick={() => setActiveIndex(index)}
                className="block cursor-zoom-in group"
              >
                <img
                  src={img?.url || "/no-image.png"}
                  alt={img?.title || "Image"}
                  className="w-full h-40 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Nhấn để phóng to
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal hiển thị hình phóng to với zoom theo chuột */}
      {activeIndex !== null && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
        >
          {/* Nút prev */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full px-3 py-2 shadow hover:bg-gray-200 z-10"
          >
            ◀
          </button>

          <div
            className="relative max-w-[90vw] max-h-[80vh] overflow-hidden flex items-center justify-center bg-white rounded-lg border-4 border-white shadow-lg cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={imageRef}
              src={data.multiple_image[activeIndex]?.url}
              alt={data.multiple_image[activeIndex]?.title || "Image"}
              className="transition-transform duration-200 ease-in-out"
              style={{
                ...zoomStyle,
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Nút next */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full px-3 py-2 shadow hover:bg-gray-200 z-10"
          >
            ▶
          </button>

          {/* Nút đóng */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
