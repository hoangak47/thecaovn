import React from "react";
import footerImage from "@/assets/images/footer.jpg";
import Image from "next/image";
import { SVGfacebook, SVGmastercard, SVGvisa, SVGyoutube } from "@/assets/svg";
import logo from "@/assets/images/logo.png";
import axios from "axios";

const defaultFooter = {
  address:
    "362/109 Hiệp Thành 13, Khu Phố 7, Phường Hiệp Thành, Quận 12, TP.HCM",
  contact:
    "<p>0938 791 097 (Mrs.Phượng)</p> <p>0909 673 260 (Mrs.Phương)</p> <p>0934 833 585 (Mrs.Hà)</p>",
  hotline:
    "<p>0788 388 588 (Mr. Vũ)</p> <p>Email: lamtanvu232@gmail.com</p> <p>MST: 0301859395</p>",
};

async function getFooter() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${url}footer`);
    return res.data;
  } catch (error) {
    return defaultFooter;
  }
}

export default async function Footer() {
  const data = await getFooter();

  return (
    <div
      style={{
        backgroundImage: `url(${footerImage.src})`,
      }}
      className="bg-cover bg-center bg-no-repeat text-white font-mono py-6 px-4 sm:px-6 lg:px-16 mt-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto border-b-2 border-black pb-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src={logo}
            alt="Footer Logo"
            className="w-3/4 sm:w-2/3 lg:w-1/2 max-w-[200px] mx-auto"
          />
          <h3 className="text-xl sm:text-2xl font-bold mt-4">
            Công ty TNHH THẾ CAO
            <br />
            TRUYỀN TẢI SỰ TÍN NHIỆM
          </h3>
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Địa chỉ</h2>
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: data.address || "" }}
          />
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Liên hệ</h2>
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: data.contact || "" }}
          />
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Hotline</h2>
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: data.hotline || "" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pt-8">
        <div className="flex items-center justify-center sm:justify-start gap-4">
          <SVGvisa width="80" height="40" className="w-16 sm:w-20" />
          <SVGmastercard width="80" height="40" className="w-16 sm:w-20" />
        </div>
        <div className="col-span-1 sm:col-span-2 text-center text-sm sm:text-base">
          <span>www.thecaovn.com © 2024 Cty TNHH MTV THẾ CAO.</span>
          <br />
          <span>Tất cả các quyền được bảo hộ.</span>
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-4">
          <SVGfacebook width="40" height="40" className="w-10 sm:w-12" />
          <SVGyoutube width="45" height="45" className="w-10 sm:w-12" />
        </div>
      </div>
    </div>
  );
}
