"use client";

import { usePathname } from "next/navigation";

export default function usePath() {
  const path = usePathname();
  const currentPath = path.split("/");
  // const currentPath = pathSegments[pathSegments.length - 1];
  return currentPath;
}
