import Head from "next/head";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta
          name="google-site-verification"
          content="iDjEWJDFYYFHqH_2jK-C0jw75XTDyn608-pPwgSjSBg"
        />
      </head>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <meta
          name="google-site-verification"
          content="iDjEWJDFYYFHqH_2jK-C0jw75XTDyn608-pPwgSjSBg"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
