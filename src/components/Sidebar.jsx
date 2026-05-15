import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Menggunakan icon alternatif yang lebih stabil di banyak versi Tabler
  const menuItems = [
    { icon: "ti-layout-dashboard", label: "Dashboard", path: "/" },
    { icon: "ti-users-group", label: "Members", path: "/members" },
    { icon: "ti-shopping-cart-copy", label: "Orders", path: "/orders" },
    { icon: "ti-gift-card", label: "Loyalty", path: "/loyalty" },
    { icon: "ti-chart-pie-2", label: "Segmentation", path: "/segmentation" },
    { icon: "ti-speakerphone", label: "Campaigns", path: "/campaigns" },
    { icon: "ti-history", label: "Queue", path: "/queue", badge: 3 },
    { icon: "ti-message-report", label: "Feedback", path: "/feedback" },
    {
      icon: "ti-presentation-analytics",
      label: "Analytics",
      path: "/analytics",
    },
  ];

  return (
    <aside className="w-[220px] bg-white border-r border-gray-200 flex flex-col h-screen shrink-0 z-20">
      <div className="flex items-center gap-[10px] p-[22px_18px] text-[#00403C] font-['Poppins'] font-bold">
        <div className="w-[30px] h-[30px] bg-[#00403C] rounded-lg flex items-center justify-center text-white text-[14px]">
          <i className="ti ti-coffee"></i>
        </div>
        <span className="tracking-tight">PAPI COFFEE</span>
      </div>

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
              {/* PERHATIKAN: Saya menambahkan "ti" sebelum "${item.icon}" */}
              <i
                className={`ti ${item.icon} text-[20px] ${isActive ? "text-[#C0FCF8]" : "opacity-70"}`}
              ></i>
              <span className={isActive ? "font-semibold" : "font-medium"}>
                {item.label}
              </span>

              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-[6px] py-[1px] rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-auto p-[16px_18px] bg-gray-50 flex items-center gap-[10px] border-t border-gray-100">
        <div className="w-9 h-9 rounded-full bg-[#B6D76D] flex items-center justify-center font-bold text-[12px] text-[#00403C]">
          JW
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-bold text-[#525252] truncate">
            James William
          </p>
          <p className="text-[10px] text-gray-400 truncate">Store Manager</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
