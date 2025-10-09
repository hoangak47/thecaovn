import Head from "next/head";
import "./globals.css";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
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
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8Y9MX8FRB3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8Y9MX8FRB3');
        `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
