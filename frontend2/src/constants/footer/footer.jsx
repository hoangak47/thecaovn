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
      className={`bg-cover bg-center bg-no-repeat text-white md:p-14 p-4 font-mono`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto px-0 pb-10 border-b-2 border-black">
        <div className="flex flex-col text-center">
          <Image src={logo} alt="Footer" className="w-2/3 mx-auto" />
          <h3 className="text-2xl font-bold">
            Công ty TNHH THẾ CAO
            <br />
            TRUYỀN TẢI SỰ TÍN NHIỆM
          </h3>
        </div>
        <div className="flex flex-col md:items-start items-center">
          <h2 className="text-3xl mb-4">Địa chỉ</h2>
          <div dangerouslySetInnerHTML={{ __html: data.address || "" }} />
        </div>
        <div className="flex flex-col md:items-start items-center">
          <h2 className="text-3xl mb-4">Liên hệ</h2>
          <div dangerouslySetInnerHTML={{ __html: data.contact || "" }} />
        </div>
        <div className="flex flex-col md:items-start items-center">
          <h2 className="text-3xl mb-4">Hotline</h2>
          <div dangerouslySetInnerHTML={{ __html: data.hotline || "" }} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto px-0 pt-10">
        <div className="flex items-center justify-around">
          <SVGvisa width="100" height="50" />
          <SVGmastercard width="100" height="50" />
        </div>
        <div className="col-span-2 text-center">
          <span>www.thecaovn.com © 2024 Cty TNHH MTV THẾ CAO.</span>
          <br />
          <span>Tất cả các quyền được bảo hộ.</span>
        </div>
        <div className="flex items-center justify-evenly">
          <SVGfacebook width="55" height="55" />
          <SVGyoutube width="60" height="60" />
        </div>
      </div>
    </div>
  );
}
