import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <aside className="w-64 bg-gray-800 text-white p-4">Admin Dashboard</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
