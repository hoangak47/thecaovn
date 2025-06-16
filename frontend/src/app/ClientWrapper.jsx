// app/ClientWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Layout from "@/constants/layout/layout";
import Body from "@/constants/body";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return children;

  return (
    <Layout>
      <Body>{children}</Body>
    </Layout>
  );
}
