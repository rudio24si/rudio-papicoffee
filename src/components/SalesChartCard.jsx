import React from "react";

export default function SalesChartCard({ orders = [] }) {
  // Kelompokkan orders per jam (07:00 - 21:00)
  const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 07 - 21

  const hourlyData = hours.map((h) => {
    const count = orders.filter((o) => {
      const d = new Date(o.created_at);
      return d.getHours() === h;
    }).length;
    const revenue = orders
      .filter((o) => {
        const d = new Date(o.created_at);
        return d.getHours() === h && o.status === "Lunas";
      })
      .reduce((sum, o) => sum + (o.total_price || 0), 0);
    return { hour: h, count, revenue };
  });

  const maxCount = Math.max(...hourlyData.map((d) => d.count), 1);
  const currentHour = new Date().getHours();

  // Ambil hanya jam yang relevan untuk ditampilkan (max 8 bar)
  const visibleHours = hourlyData.filter((d) => d.hour <= Math.max(currentHour, 14));
  const displayHours = visibleHours.slice(-8);

  return (
    <div className="col-span-2 bg-white rounded-xl p-[18px] border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C]">
          Tren Penjualan Per Jam
        </p>
        <div className="flex items-center gap-[6px]">
          <span className="w-[7px] h-[7px] bg-[#00AAA6] rounded-full animate-pulse"></span>
          <span className="text-[10px] text-[#00AAA6] font-bold uppercase">
            Hari Ini
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="h-[140px] flex items-center justify-center text-sm text-gray-300">
          Belum ada transaksi hari ini
        </div>
      ) : (
        <div className="h-[140px] flex items-end justify-between gap-2 px-1 relative">
          {displayHours.map((d, i) => {
            const heightPct = Math.round((d.count / maxCount) * 100);
            const isCurrent = d.hour === currentHour;
            return (
              <div
                key={d.hour}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 bg-[#00403C] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none left-1/2 -translate-x-1/2">
                  {d.count} order · Rp {(d.revenue / 1000).toFixed(0)}rb
                </div>
                {/* Bar */}
                <div className="w-full bg-[#f0f9f8] rounded-t-md overflow-hidden h-full flex items-end">
                  <div
                    style={{ height: `${Math.max(heightPct, 2)}%` }}
                    className={`w-full transition-all duration-700 ease-out ${
                      isCurrent
                        ? "bg-[#00403C]"
                        : d.count > 0
                        ? "bg-[#C0FDF9] group-hover:bg-[#00AAA6]"
                        : "bg-gray-100"
                    }`}
                  />
                </div>
                <span className="text-[9px] text-gray-400 font-medium">
                  {String(d.hour).padStart(2, "0")}:00
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
