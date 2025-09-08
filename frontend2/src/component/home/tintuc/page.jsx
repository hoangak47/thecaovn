import Link from "next/link";
import React from "react";
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";

  // Nếu là Firestore Timestamp object (có _seconds và _nanoseconds)
  if (typeof timestamp === "object" && typeof timestamp._seconds === "number") {
    timestamp = new Date(
      timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1e6)
    );
  } else if (
    typeof timestamp === "object" &&
    typeof timestamp.toDate === "function"
  ) {
    // Nếu là Firestore Timestamp chuẩn
    timestamp = timestamp.toDate();
  } else {
    // Nếu là string hoặc số
    timestamp = new Date(timestamp);
  }

  return timestamp.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function TinTuc({ data }) {
  return (
    <section className="flex flex-col xl:px-28 px-4 mt-10">
      <h1 className="text-2xl md:text-4xl font-medium mt-5 text-center m-5">
        Tin tức mới nhất từ{" "}
        <span className="text-[var(--color-primary)]">Thế Cao</span>
      </h1>
      <div className="flex mt-10 md:flex-row flex-col">
        <Link
          href={`${data.length > 0 && data[0]?.url}`}
          className="flex-1 flex flex-col p-5"
        >
          <img
            src={data.length > 0 && data[0]?.image}
            alt={"as"}
            className="object-contain aspect-4/3 w-full"
          />

          <h1 className="text-2xl font-medium mt-5 line-clamp-2">
            {data.length > 0 && data[0]?.title}
          </h1>
          <p className="text-base mt-1 text-[--color-gray] line-clamp-2">
            {data.length > 0 && data[0]?.short_description}
          </p>

          <div className="flex items-center text-xs text-gray-400 mb-2">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {data &&
              formatTimestamp(
                (data.length > 0 && data[0]?.updatedAt) ||
                  (data.length > 0 && data[0]?.createdAt)
              )}
          </div>
        </Link>
        <div className="flex-1 flex flex-col ml-5">
          {data?.slice(1, 4).map((item, index) => (
            <Link
              href={`${item.url}`}
              key={index}
              className="flex flex-col hover:bg-gray-100 md:px-5 py-5 rounded-md cursor-pointer"
            >
              <div className="flex">
                <img
                  src={item.image}
                  alt={"as"}
                  className="object-contain aspect-4/3 md:w-[200px] w-[100px] rounded-md"
                />
                <div className="flex-1 ml-5">
                  <h1 className="md:text-2xl text-base font-medium line-clamp-2">
                    {item.title}
                  </h1>
                  <p className="md:text-base text-sm mt-1 text-[--color-gray] line-clamp-2">
                    {item.short_description}
                  </p>

                  <div className="flex items-center text-xs text-gray-400 mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatTimestamp(item.updatedAt || item.createdAt)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
