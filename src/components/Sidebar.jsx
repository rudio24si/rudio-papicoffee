import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Receipt,
  Users,
  BarChart3,
  Settings,
  Plus,
} from "lucide-react";

const menus = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Inventory", path: "/inventory", icon: Package },
  { name: "Orders", path: "/orders", icon: Receipt },
  { name: "Staff", path: "/staff", icon: Users },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-white border-r shadow-sm flex flex-col">
      {/* 🔹 Logo */}
      <div className="px-6 py-6 border-b">
        <h1 className="text-lg font-bold text-gray-800">Papi Coffee</h1>
        <p className="text-xs text-gray-500">Admin Console</p>
      </div>

      {/* 🔹 Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          const Icon = menu.icon;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-gray-900 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 🔹 Footer */}
      <div className="p-4 border-t">
        <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg text-sm hover:opacity-90 transition">
          <Plus size={16} />
          New Order
        </button>
      </div>
    </aside>
  );
}
