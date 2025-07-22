// "use client";

import Layout from "@/constants/layout/layout";
import Body from "@/constants/body";
import { GlobalProvider } from "@/context/GlobalContext";
import { headers } from "next/headers";

export default async function ClientWrapper({ children }) {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const isAdmin = referer.includes("/admin");

  if (isAdmin) return children;

  return (
    <GlobalProvider>
      <Layout>
        <Body>{children}</Body>
      </Layout>
    </GlobalProvider>
  );
}
