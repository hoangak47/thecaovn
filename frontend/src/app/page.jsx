import getGioiThieuData from "@/component/home/gioithieu/getdata";
import GioiThieu from "@/component/home/gioithieu/gioithieu";
import getSlideData from "@/component/home/slide/getdata";
import Slide from "@/component/home/slide/slide";
import TieuChi from "@/component/home/tieuchi/page";

import "./globals.css";
import Doitac from "@/component/home/doitac/page";
import KhachHang from "@/component/home/khach-hang/page";
import TinTuc from "@/component/home/tintuc/page";
import getDataTinTuc from "@/component/home/tintuc/getdata";
import LoadProduct from "@/component/loadProduct";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Công ty TNHH THẾ CAO",
  url: "https://thecaovn.com", // Thay bằng URL thật
  logo: "https://thecaovn.com/logo.png", // Thay bằng logo thật
  address: {
    "@type": "PostalAddress",
    streetAddress: "362/109 Hiệp Thành 13, Khu Phố 7",
    addressLocality: "Quận 12",
    addressRegion: "Hồ Chí Minh",
    addressCountry: "VN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+84 788 388 588",
    contactType: "customer service",
    email: "lamtanvu232@gmail.com",
  },
};

export async function generateMetadata() {
  return {
    title: "Công ty TNHH MTV Thế Cao",
    description:
      "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được thành lập năm 1999. Trải qua hơn một phần tư thế kỷ không ngừng sáng tạo và đầu tư, Thế Cao đã vươn lên trở thành nhà cung cấp sỉ – lẻ hàng đầu",
    keywords: "Công ty Thế Cao, Băng tải",
    openGraph: {
      title: "Công ty TNHH MTV Thế Cao",
      description:
        "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được tphcm thêm nhà cung cấp sỉ – lẻ hàng đầu",
      images: ["https://thecaovn.com/logo.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Công ty TNHH MTV Thế Cao",
      description:
        "Công ty TNHH MTV Thế Cao (gọi tắt Băng tải Thế Cao) được tphcm thêm nhà cung cấp sỉ – lẻ hàng đầu",
      images: ["https://thecaovn.com/logo.png"],
    },
  };
}

export default async function Home() {
  const slideData = await getSlideData();
  const gioiThieuData = await getGioiThieuData();
  const tinTucData = await getDataTinTuc();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Slide data={slideData} />
      <GioiThieu data={gioiThieuData} />
      <LoadProduct search="san-pham" title="SẢN PHẨM" />
      <LoadProduct search="nganh-nghe" title="NGÀNH NGHỀ ỨNG DỤNG" limit={10} />
      <TieuChi />
      <Doitac />
      <KhachHang />
      {/* <TinTuc data={tinTucData} /> */}
    </>
  );
}
