"use client";

import Layout from "@/constants/layout/layout";
import Body from "@/constants/body";
import { GlobalProvider } from "@/context/GlobalContext";
import { usePathname } from "next/navigation";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");
  if (isAdmin) return children;

  return (
    <GlobalProvider>
      <Layout>
        <Body>{children}</Body>
      </Layout>
    </GlobalProvider>
  );
}
