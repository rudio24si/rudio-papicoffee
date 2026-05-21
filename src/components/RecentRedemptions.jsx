import React from "react";

const RecentRedemptions = ({ logs, onViewAll }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-[#00403C] font-['Poppins'] px-1">
        Penukaran Terakhir
      </h3>
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
        {logs.map((log, i) => (
          <div
            key={i}
            className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-[#00403C]">
              {log.user.split(" ")[0][0]}
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-bold text-[#525252]">{log.user}</p>
              <p className="text-[11px] text-[#00AAA6] font-medium">
                {log.category === "Voucher" ? "🎫" : "☕"} {log.item}
              </p>
            </div>
            <span className="text-[10px] text-gray-400">{log.time}</span>
          </div>
        ))}
        <button
          onClick={onViewAll}
          className="w-full p-3 text-[11px] font-bold text-[#00AAA6] bg-gray-50/50 hover:bg-gray-100 transition-colors"
        >
          LIHAT SEMUA AKTIVITAS
        </button>
      </div>
    </div>
  );
};

export default RecentRedemptions;
