import React from "react";

const StatCard = ({ label, value, growth, growthType }) => (
  <div
    className={`bg-white rounded-xl p-[18px] border border-gray-100 flex flex-col justify-between ${growthType === "primary" ? "bg-[#00403C]" : ""}`}
  >
    <div>
      <p
        className={`text-[11px] font-medium mb-[6px] ${growthType === "primary" ? "text-[#B6D76D]" : "text-[#737373]"}`}
      >
        {label}
      </p>
      <p
        className={`text-[22px] font-bold ${growthType === "primary" ? "text-white" : "text-[#00403C]"}`}
      >
        {value}
      </p>
    </div>
    {growth && (
      <p
        className={`text-[11px] font-semibold mt-2 ${
          growthType === "up"
            ? "text-[#00AAA6]"
            : growthType === "alert"
              ? "text-red-500"
              : growthType === "primary"
                ? "text-[#C0FCF8]"
                : "text-[#A68BFF]"
        }`}
      >
        {growth}
      </p>
    )}
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto p-[18px] bg-[#F5F5F5]">
      <div className="grid grid-cols-4 gap-[14px]">
        {/* ROW 1: STATS */}
        <StatCard
          label="Omzet Hari Ini"
          value="Rp 4.280.000"
          growth="▲ +12% dari kemarin"
          growthType="up"
        />
        <StatCard
          label="Total Cup Terjual"
          value="142"
          growth="Peak: 09:00 AM"
          growthType="info"
        />
        <StatCard
          label="Stok Susu (L)"
          value="4.2 L"
          growth="⚠ Perlu restock"
          growthType="alert"
        />
        <StatCard
          label="Member Baru"
          value="12"
          growth="Target: 20/hari"
          growthType="primary"
        />

        {/* ROW 2: CHART (SPAN 2) */}
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

        {/* PERSEDIAAN BIJI KOPI */}
        <div className="bg-white rounded-xl p-[18px] border border-gray-100">
          <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
            Persediaan Biji Kopi
          </p>
          <div className="flex flex-col gap-3 text-[12px]">
            <div className="flex justify-between border-b border-gray-50 pb-1 text-[#737373]">
              <span>House Blend</span>
              <b className="text-[#00403C]">4.2 kg</b>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-1 text-[#737373]">
              <span>Arabica Gayo</span>
              <b className="text-[#00403C]">1.5 kg</b>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Decaf</span>
              <b>0.2 kg</b>
            </div>
          </div>
        </div>

        {/* MENU TERLARIS (VERTICAL SPAN) */}
        <div className="row-span-2 bg-white rounded-xl p-[18px] border border-gray-100">
          <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
            Menu Terlaris
          </p>
          {[
            { img: "🧊", name: "Aren Latte", sold: "52 cups" },
            { img: "☕", name: "Americano", sold: "38 cups" },
            { img: "🍵", name: "Matcha Berry", sold: "21 cups" },
            { img: "🥐", name: "Croissant", sold: "15 pcs" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-none"
            >
              <div className="w-10 h-10 bg-[#C0FCF8] rounded-lg flex items-center justify-center text-lg">
                {item.img}
              </div>
              <div>
                <p className="font-bold text-[13px] text-[#525252]">
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400">{item.sold} terjual</p>
              </div>
            </div>
          ))}
        </div>

        {/* TRANSAKSI TERAKHIR (HORIZONTAL SPAN) */}
        <div className="col-span-3 bg-white rounded-xl p-[18px] border border-gray-100">
          <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
            Transaksi Terakhir
          </p>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="text-[11px] text-gray-400 uppercase border-b border-gray-100">
                <th className="pb-3 font-semibold px-2">ID Order</th>
                <th className="pb-3 font-semibold">Menu Pesanan</th>
                <th className="pb-3 font-semibold">Waktu</th>
                <th className="pb-3 font-semibold">Harga</th>
                <th className="pb-3 font-semibold text-right px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1024, 1023, 1022].map((id) => (
                <tr key={id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-bold px-2">#{id}</td>
                  <td className="py-4 text-[#737373]">
                    Aren Latte, Almond Croissant
                  </td>
                  <td className="py-4 text-gray-400">10:42 AM</td>
                  <td className="py-4 font-bold text-[#00403C]">Rp 65.000</td>
                  <td className="py-4 text-right px-2">
                    <span className="bg-[#B6D76D] text-[#00403C] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      Lunas
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
