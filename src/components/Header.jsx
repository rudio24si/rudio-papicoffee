import { Bell, Search } from "lucide-react";

export default function Header({ title }) {
  return (
    <header className="flex items-center justify-between mb-6">
      {/* 🔹 Left */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">Welcome back 👋</p>
      </div>

      {/* 🔹 Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm w-40"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span className="hidden md:block text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
