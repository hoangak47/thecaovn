import React from "react";
import footerImage from "@/assets/images/footer.jpg";
import Image from "next/image";
import { SVGfacebook, SVGmastercard, SVGvisa, SVGyoutube } from "@/assets/svg";

import logo from "@/assets/images/logo.png";

export default function Footer() {
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
          <p className="text-center md:text-left">
            362/109 Hiệp Thành 13, Khu Phố 7, Phường Hiệp Thành, Quận 12, Thành
            phố Hồ Chí Minh
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center">
          <h2 className="text-3xl mb-4">Liên hệ</h2>
          <p>
            <a href="tel:+84938791097">0938 791 097</a>(Mrs.Phượng)
            <br />
            <a href="tel:+84909673260">0909 673 260</a>(Mrs.Phương)
            <br />
            <a href="tel:+84934833585">0934 833 585</a> (Mrs.Hà)
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center">
          <h2 className="text-3xl mb-4">Hotline</h2>
          <a href="tel:+84788388588">0788 388 588 (Mr. Vũ)</a>
          <p>
            Email:
            <a href="mailto:lamtanvu232@gmai.com"> lamtanvu232@gmail.com</a>
          </p>
          MST: 0301859395
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
