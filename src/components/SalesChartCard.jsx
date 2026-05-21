import React from "react";

export default function SalesChartCard() {
  return (
    <div className="col-span-2 bg-white rounded-xl p-[18px] border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C]">
          Tren Penjualan Per Jam
        </p>
        <div className="flex items-center gap-[6px]">
          <span className="w-[7px] h-[7px] bg-[#00AAA6] rounded-full animate-pulse"></span>
          <span className="text-[10px] text-[#00AAA6] font-bold uppercase">
            Live Updating
          </span>
        </div>
      </div>

      {/* BAR CHART CONTAINER */}
      <div className="h-[140px] flex items-end justify-between gap-2 px-1 relative">
        {[30, 65, 95, 70, 50, 40, 55].map((h, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
          >
            {/* TOOLTIP ON HOVER */}
            <div className="absolute bottom-[100%] mb-2 bg-[#00403C] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none">
              Rp 420rb · {h} cup
            </div>
            {/* THE BAR */}
            <div className="w-full bg-[#f0f9f8] rounded-t-md overflow-hidden h-full flex items-end">
              <div
                style={{ height: `${h}%` }}
                className={`w-full transition-all duration-700 ease-out ${i === 2 ? "bg-[#00403C]" : "bg-[#C0FDF9] group-hover:bg-[#00AAA6]"}`}
              ></div>
            </div>
            <span className="text-[9px] text-gray-400 font-medium">
              0{7 + i}:00
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
