import getSlideData from "@/component/home/slide/getdata";
import Slide from "@/component/home/slide/slide";
import axios from "axios";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Liên Hệ",
    description:
      "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được thành lập năm 1999. Trải qua hơn một phần tư thế kỷ không ngừng sáng tạo và đầu tư, Thế Cao đã vươn lên trở thành nhà cung cấp sỉ – lẻ hàng đầu",
    keywords: "Công ty Thế Cao, Băng tải",
    openGraph: {
      title: "Liên Hệ",
      description:
        "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được tphcm thêm nhà cung cấp sỉ – lẻ hàng đầu",
      images: ["https://thecaovn.com/logo.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Liên Hệ",
      description:
        "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được tphcm thêm nhà cung cấp sỉ – lẻ hàng đầu",
      images: ["https://thecaovn.com/logo.png"],
    },
  };
}

async function getData() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${url}lien-he`);
    const result = res.data;
    return result || {};
  } catch (error) {
    return {};
  }
}

export default async function page() {
  const slideData = await getSlideData();
  const data = await getData();
  return (
    <>
      <Slide data={slideData} />
      <section className="flex flex-col mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-6 lg:px-28">
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          <h2 className="text-center font-semibold text-gray-800 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
            {data?.title || "LIÊN HỆ"}
          </h2>
          <div
            className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-10 flex flex-col items-center text-center"
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          ></div>
          <form
            action="#"
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6"
            method="POST"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-4">
              <div className="flex flex-col">
                <label
                  className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2"
                  htmlFor="fullname"
                >
                  Họ và tên
                </label>
                <input
                  className="text-sm sm:text-base text-gray-700 placeholder-gray-400 border-b border-blue-500 focus:border-blue-700 outline-none"
                  id="fullname"
                  name="fullname"
                  placeholder="Nhập họ và tên"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2"
                  htmlFor="phone"
                >
                  Điện thoại
                </label>
                <input
                  className="text-sm sm:text-base text-gray-700 placeholder-gray-400 border-b border-blue-500 focus:border-blue-700 outline-none"
                  id="phone"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  type="tel"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2"
                  htmlFor="address"
                >
                  Địa chỉ
                </label>
                <input
                  className="text-sm sm:text-base text-gray-700 placeholder-gray-400 border-b border-blue-500 focus:border-blue-700 outline-none"
                  id="address"
                  name="address"
                  placeholder="Nhập địa chỉ"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="text-sm sm:text-base text-gray-700 placeholder-gray-400 border-b border-blue-500 focus:border-blue-700 outline-none"
                  id="email"
                  name="email"
                  placeholder="Nhập email"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2"
                htmlFor="title"
              >
                Tiêu đề
              </label>
              <input
                className="text-sm sm:text-base text-gray-700 placeholder-gray-400 border-b border-blue-500 focus:border-blue-700 outline-none"
                id="title"
                name="title"
                placeholder="Nhập tiêu đề"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2"
                htmlFor="content"
              >
                Nội dung
              </label>
              <textarea
                className="text-sm sm:text-base text-gray-700 placeholder-gray-400 border-b border-blue-500 focus:border-blue-700 outline-none"
                id="content"
                name="content"
                placeholder="Nhập nội dung"
                rows={3}
                defaultValue={""}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-full px-6 sm:px-8 py-2 sm:py-2.5"
                type="submit"
              >
                GỬI THÔNG TIN
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
