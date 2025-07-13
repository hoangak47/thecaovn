import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClientLayout from "./AdminClientLayout";

export default function Layout({ children }) {
  // Check token từ cookie
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  console.log(token);

  if (!token) {
    redirect("/admin/login");
  }

  return <AdminClientLayout>{children}</AdminClientLayout>;
}
