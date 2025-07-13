import getSlideData from "@/component/home/slide/getdata";
import Slide from "@/component/home/slide/slide";
import { formatTimestamp } from "@/component/home/tintuc/page";
import Suggestion from "@/component/suggestion";
import Link from "next/link";
import React from "react";

// Giả sử bạn có hàm fetch tin tức
async function getTinTucData() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${url}tin-tuc`, {
    cache: "no-store",
  });
  return await res.json();
}

export async function generateMetadata() {
  return {
    title: "Tin Tức",
    description:
      "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được thành lập năm 1999. Trải qua hơn một phần tư thế kỷ không ngừng sáng tạo và đầu tư, Thế Cao đã vươn lên trở thành nhà cung cấp sỉ – lẻ hàng đầu",
    keywords: "Công ty Thế Cao, Băng tải",
    openGraph: {
      title: "Tin Tức",
      description:
        "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được tphcm thêm nhà cung cấp sỉ – lẻ hàng đầu",
      images: ["https://thecaovn.com/logo.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tin Tức",
      description:
        "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được tphcm thêm nhà cung cấp sỉ – lẻ hàng đầu",
      images: ["https://thecaovn.com/logo.png"],
    },
  };
}

export default async function Page() {
  const slideData = await getSlideData();
  const tinTucData = await getTinTucData();

  return (
    <>
      <Slide data={slideData} />
      <div className="container mx-auto xl:px-28 py-16">
        <div className="flex gap-4 md:flex-row flex-col-reverse">
          <Suggestion />
          <div className="flex-[12] md:flex-[9] py-4 px-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">
              Tin tức
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {tinTucData.map((item, idx) => (
                <Link
                  key={item.id || idx}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col"
                  href={`/${item.url}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 md:h-56 object-cover rounded-t-lg"
                  />
                  <div className="flex-1 flex flex-col p-4">
                    <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                      {item.title}
                    </h2>
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
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {item.short_description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
