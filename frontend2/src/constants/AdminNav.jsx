export default function AdminNav() {
  return (
    <nav className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        <li>
          <a
            href="/admin/dashboard"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Dashboard
          </a>
        </li>
        {/* Thêm các menu khác */}
      </ul>
    </nav>
  );
}
