import getSlideData from "@/component/home/slide/getdata";
import Slide from "@/component/home/slide/slide";
import LoadProduct from "@/component/loadProduct";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Sản Phẩm",
    description:
      "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được thành lập năm 1999. Trải qua hơn một phần tư thế kỷ không ngừng sáng tạo và đầu tư, Thế Cao đã vươn lên trở thành nhà cung cấp sỉ – lẻ hàng đầu",
    keywords: "Công ty Thế Cao, Băng tải",
    openGraph: {
      title: "Sản Phẩm",
      description:
        "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được tphcm thêm nhà cung cấp sỉ – lẻ hàng đầu",
      images: ["https://thecaovn.com/logo.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sản Phẩm",
      description:
        "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được tphcm thêm nhà cung cấp sỉ – lẻ hàng đầu",
      images: ["https://thecaovn.com/logo.png"],
    },
  };
}

export default async function page() {
  const slideData = await getSlideData();
  return (
    <>
      <Slide data={slideData} />
      <LoadProduct search="san-pham" title="SẢN PHẨM" />
    </>
  );
}
