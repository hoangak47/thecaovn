import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClientLayout from "./AdminClientLayout";

export default async function Layout({ children }) {
  // Check token từ cookie
  const cookieStore = await cookies();
  const token = cookieStore?.get("token");

  if (!token) {
    redirect("/admin/login");
  }

  return <AdminClientLayout>{children}</AdminClientLayout>;
}
