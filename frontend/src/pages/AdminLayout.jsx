import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <Outlet />
      </div>

    </div>
  );
}