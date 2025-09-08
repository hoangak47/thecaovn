import AdminNav from "@/constants/AdminNav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 bg-gray-50">{children}</div>
    </div>
  );
}
