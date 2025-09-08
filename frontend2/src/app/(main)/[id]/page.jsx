import Slide from "@/component/home/slide/slide";
import React from "react";
import NoImage from "@/assets/images/noimage.png";
import Suggestion from "@/component/suggestion";
import axios from "axios";
import LoadListProduct from "./loadListProduct";
import { cache } from "react";
import ImageGallery from "@/component/imageGallery";
import getSlideData from "@/component/home/slide/getdata";

const getData = cache(async (id) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await axios.get(`${url}${id}`);
    return await res.data;
  } catch (error) {
    return [];
  }
});
async function getSanPham(id) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await axios.get(`${url}san-pham?search=${id}`);
    let data = res.data;

    // Nếu có data.parent_category === false, fetch tiếp
    if (data[0]?.parent_category === false) {
      const res_ = await axios.get(`${url}${id}`);
      let data_ = res_.data;
      if (data_ && !Array.isArray(data_)) data_ = [data_];
      return data_;
    }

    return data;
  } catch (error) {
    return [];
  }
}

async function getDetailProduct(params) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await axios.get(`${url}san-pham/${params}`);

    return res.data;
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const data = await getData(id);
  const detail = await getDetailProduct(id);

  // Ưu tiên dùng detail nếu có, nếu không thì dùng data
  const meta = detail && Object.keys(detail).length > 2 ? detail : data;

  return {
    title: meta?.SEO_title || meta?.title || "Giới thiệu",
    description: meta?.SEO_description || meta?.short_description || "",
    keywords: meta?.SEO_keywords || "",
    robots: "index, follow",
    openGraph: {
      title: meta?.SEO_title || meta?.title || "Giới thiệu",
      description: meta?.SEO_description || meta?.short_description || "",
      images: [meta?.SEO_image || meta?.image || NoImage.src],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.SEO_title || meta?.title || "Giới thiệu",
      description: meta?.SEO_description || meta?.short_description || "",
      images: [meta?.SEO_image || meta?.image || NoImage.src],
    },
  };
}
export default async function page({ params }) {
  const slideData = await getSlideData();
  const id = (await params).id;
  const data = await getData(id);
  const detail_sanPham = await getDetailProduct(id);
  const sanPham = await getSanPham(detail_sanPham?.parent_category || id);

  const schema = sanPham?.schema || detail_sanPham?.schema || data?.schema;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: schema,
          }}
        />
      )}

      <Slide data={slideData} />

      <div className="container mx-auto xl:px-12 py-16">
        <div className="flex gap-4 md:flex-row flex-col-reverse">
          {data?.parent_category === "san-pham" || detail_sanPham ? (
            <Suggestion />
          ) : null}

          <div className="flex-col flex-2/3">
            {data?.type === "tin-tuc" && (
              <>
                <h1 className="text-2xl md:text-4xl font-medium mt-5 text-center m-5 ">
                  {data?.title}
                </h1>
                <div
                  className="ck-content xl:px-12 px-4 mt-10"
                  dangerouslySetInnerHTML={{
                    __html: data?.description || "",
                  }}
                />
                <div className="w-full h-[1px] bg-[#000] my-10"></div>
                <LoadListProduct sanPham={sanPham} />
              </>
            )}

            {data?.type === "category" && (
              <>
                <h1 className="text-2xl md:text-4xl font-medium mt-5 text-center m-5 ">
                  {data?.title}
                </h1>
                <div
                  className="ck-content xl:px-12 px-4 mt-10"
                  dangerouslySetInnerHTML={{
                    __html: data?.description || "",
                  }}
                />
                <div className="w-full h-[1px] bg-[#000] my-10"></div>
                <LoadListProduct sanPham={sanPham} max={4} />
                <ImageGallery data={data} />
              </>
            )}

            {detail_sanPham?.type === "san-pham" && (
              <div className="mx-auto px-4 py-8 w-full">
                <div className="flex flex-col md:flex-row md:space-x-8 border border-gray-300 rounded-md p-4">
                  <div className="flex-shrink-0 border border-gray-300 rounded-md overflow-hidden max-w-[500px] relative">
                    <input
                      type="checkbox"
                      id={`zoom-img-${detail_sanPham.id}`}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`zoom-img-${detail_sanPham.id}`}
                      className="block cursor-zoom-in group"
                    >
                      <img
                        src={
                          detail_sanPham.image &&
                          detail_sanPham.image.trim() !== ""
                            ? detail_sanPham.image
                            : NoImage.src
                        }
                        alt={detail_sanPham.title}
                        className="w-full h-40 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Nhấn để phóng to
                      </span>
                    </label>
                    <label
                      htmlFor={`zoom-img-${detail_sanPham.id}`}
                      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center cursor-zoom-out opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity duration-300"
                    >
                      <img
                        src={
                          detail_sanPham.image &&
                          detail_sanPham.image.trim() !== ""
                            ? detail_sanPham.image
                            : NoImage.src
                        }
                        alt={detail_sanPham.title}
                        className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg border-4 border-white animate-zoomIn transition-transform duration-300 cursor-zoom-in active:scale-150"
                        style={{ objectFit: "contain" }}
                      />
                    </label>
                  </div>
                  <div className="mt-6 md:mt-0 flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {detail_sanPham?.title}
                    </h2>
                    <div className="w-full h-[1px] bg-[#000] my-10"></div>
                    <div
                      className="mt-6 text-gray-800 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: detail_sanPham?.short_description,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="mt-6 text-gray-800 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: detail_sanPham?.description,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {detail_sanPham?.type === "san-pham" && (
          <>
            <div className="w-full h-[1px] bg-[#000] my-10"></div>
            <h1 className="text-4xl font-medium mt-5 text-center m-5 text-[var(--color-primary)]">
              Các sản phẩm cùng loại
            </h1>
            <LoadListProduct sanPham={sanPham} />
          </>
        )}
      </div>
    </>
  );
}
