import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [queueCount, setQueueCount] = useState(0);

  // Fetch jumlah antrian aktif (In Progress + Ready)
  const fetchQueueCount = async () => {
    try {
      const { count, error } = await supabase
        .from("queue")
        .select("*", { count: "exact", head: true })
        .neq("status", "Completed");
      if (!error) setQueueCount(count || 0);
    } catch {
      // silently fail
    }
  };

  useEffect(() => {
    fetchQueueCount();

    // Realtime subscription — update badge langsung saat ada INSERT/UPDATE/DELETE di tabel queue
    const channel = supabase
      .channel("queue-badge")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "queue" },
        () => fetchQueueCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { icon: "ti-layout-dashboard", label: "Dashboard", path: "/app" },
    { icon: "ti-users-group", label: "Users", path: "/app/users" },
    { icon: "ti-users-group", label: "Members", path: "/app/members" },
    { icon: "ti-shopping-cart-copy", label: "Orders", path: "/app/orders" },
    { icon: "ti-gift-card", label: "Loyalty", path: "/app/loyalty" },
    { icon: "ti-chart-pie-2", label: "Segmentation", path: "/app/segmentation" },
    { icon: "ti-speakerphone", label: "Campaigns", path: "/app/campaigns" },
    { icon: "ti-history", label: "Queue", path: "/app/queue", badge: queueCount },
    { icon: "ti-message-report", label: "Feedback", path: "/app/feedback" },
    {
      icon: "ti-presentation-analytics",
      label: "Analytics",
      path: "/app/analytics",
    },
  ];

  return (
    <aside className="w-[220px] bg-white border-r border-gray-200 flex flex-col h-screen shrink-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-[10px] p-[22px_18px] text-[#00403C] font-['Poppins'] font-bold">
        <div className="w-[30px] h-[30px] bg-[#00403C] rounded-lg flex items-center justify-center text-white text-[14px]">
          <i className="ti ti-coffee"></i>
        </div>
        <span className="tracking-tight">PAPI COFFEE</span>
      </div>

      {/* Menu */}
      <div className="overflow-y-auto flex-1 no-scrollbar">
        <p className="text-[10px] text-gray-400 px-[18px] py-[14px] pb-[5px] tracking-[1.2px] uppercase font-bold">
          Menu Utama
        </p>

        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-[12px] py-[10px] px-[18px] mx-[10px] my-[2px] cursor-pointer rounded-lg text-[13px] transition-all duration-200
              ${
                isActive
                  ? "bg-[#00403C] text-white shadow-md shadow-[#00403c]/20"
                  : "text-[#737373] hover:bg-[#F0FAF9] hover:text-[#00AAA6]"
              }`}
            >
              <i
                className={`ti ${item.icon} text-[20px] ${isActive ? "text-[#C0FCF8]" : "opacity-70"}`}
              ></i>
              <span className={isActive ? "font-semibold" : "font-medium"}>
                {item.label}
              </span>
              {item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-[6px] py-[1px] rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* User Info + Logout */}
      <div className="mt-auto border-t border-gray-100">
        {/* User Info */}
        <div className="p-[14px_18px] bg-gray-50 flex items-center gap-[10px]">
          <div className="w-9 h-9 rounded-full bg-[#B6D76D] flex items-center justify-center font-bold text-[12px] text-[#00403C] shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-bold text-[#525252] truncate">
              {user.name || "Unknown"}
            </p>
            <p className="text-[10px] text-gray-400 truncate capitalize">
              {user.role || "User"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-[10px_18px] pb-[14px]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-[10px] px-[14px] py-[9px] rounded-lg text-[13px] text-red-500 hover:bg-red-50 transition-all duration-200 font-medium"
          >
            <i className="ti ti-logout text-[18px]"></i>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
