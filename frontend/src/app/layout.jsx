import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { GlobalProvider } from "@/context/GlobalContext";
import Layout from "@/constants/layout/layout";
import Body from "@/constants/body";
import { headers } from "next/headers";
import { Fragment } from "react";

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get("referer") || "";
  const isAdminPage =
    pathname.includes("/admin") || pathname.includes("/admin/");

  console.log("Current Path:", pathname);

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        {isAdminPage ? (
          <Fragment>{children}</Fragment>
        ) : (
          <GlobalProvider>
            <Layout>
              <Body>{children}</Body>
            </Layout>
          </GlobalProvider>
        )}
      </body>
    </html>
  );
}
