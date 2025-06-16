import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import ClientWrapper from "./ClientWrapper";

export default function RootLayout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Công ty TNHH THẾ CAO",
    url: "https://thecao.vercel.app/", // Thay bằng URL thật
    logo: "https://thecao.vercel.app/logo.png", // Thay bằng logo thật
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

  return (
    <html lang="en">
      <head>
        {/* <title>Công ty TNHH THẾ CAO</title>
        <meta
          name="description"
          content="Công ty TNHH THẾ CAO chuyên cung cấp dịch vụ uy tín tại Quận 12, TP. HCM. Liên hệ ngay!"
        />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script> */}
      </head>
      {/* <meta
        name="google-site-verification"
        content="HYV1y2_mgjeriNKA6NB_iCS9-Ak5-mbkcCoxqH02yZ0"
      /> */}
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
