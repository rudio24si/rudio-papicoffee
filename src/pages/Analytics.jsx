import React from "react";
import { TrendingUp, Users, Clock, ArrowUpRight } from "lucide-react";

export default function Analytics() {
  return (
    <div className="p-[20px] space-y-8 bg-[#F5F5F5] min-h-full">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
          Analisis Bisnis
        </h2>
        <p className="text-sm text-[#737373]">
          Pantau performa kedai dan perilaku pelanggan Anda secara real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Performance Chart (Span 2) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold font-['Poppins'] text-[#00403C] flex items-center gap-2">
              <TrendingUp size={20} className="text-[#00AAA6]" /> Performa
              Penjualan Mingguan
            </h3>
            <span className="text-[11px] font-bold text-[#00AAA6] bg-[#C0FCF8] px-2 py-1 rounded">
              +14.2% MINGGU INI
            </span>
          </div>

          {/* Chart Bars */}
          <div className="h-64 bg-[#F9FAFB] rounded-xl flex items-end justify-between p-6 gap-3">
            {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-3 h-full justify-end group"
              >
                <div
                  style={{ height: `${h}%` }}
                  className={`w-full rounded-t-md transition-all duration-500 ease-in-out cursor-pointer
                    ${i === 6 ? "bg-[#00403C]" : "bg-[#C0FDF9] group-hover:bg-[#00AAA6]"}`}
                >
                  {/* Tooltip on Hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#00403C] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Rp {(h * 100).toLocaleString()}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Small Analytics Cards */}
        <div className="flex flex-col gap-4">
          {/* New Customers Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-[#00AAA6] transition-colors">
            <div className="p-4 bg-[#F0FAF9] text-[#00AAA6] rounded-xl group-hover:bg-[#00AAA6] group-hover:text-white transition-colors">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#737373] uppercase tracking-wider">
                Pelanggan Baru
              </p>
              <h4 className="text-2xl font-bold text-[#00403C]">1,240</h4>
              <p className="text-[10px] text-[#00AAA6] font-semibold flex items-center gap-1 mt-1">
                <ArrowUpRight size={12} /> 8% vs bulan lalu
              </p>
            </div>
          </div>

          {/* Service Time Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-[#00AAA6] transition-colors">
            <div className="p-4 bg-[#FFF7ED] text-[#F97316] rounded-xl group-hover:bg-[#F97316] group-hover:text-white transition-colors">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#737373] uppercase tracking-wider">
                Rata-rata Servis
              </p>
              <h4 className="text-2xl font-bold text-[#00403C]">4.5 mnt</h4>
              <p className="text-[10px] text-[#00AAA6] font-semibold mt-1">
                Sesuai target operasional
              </p>
            </div>
          </div>

          {/* Loyalty Highlight (Aksen Primary Papi Coffee) */}
          <div className="bg-[#00403C] p-6 rounded-xl shadow-sm relative overflow-hidden flex-1">
            <div className="relative z-10">
              <p className="text-xs font-bold text-[#B6D76D] uppercase tracking-wider">
                Skor Loyalitas
              </p>
              <h4 className="text-2xl font-bold text-white mt-1">4.8/5.0</h4>
              <p className="text-[11px] text-[#C0FCF8] mt-2 leading-relaxed">
                92% pelanggan melakukan pembelian ulang dalam 30 hari terakhir.
              </p>
            </div>
            {/* Dekorasi Aksen Lingkaran */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#00AAA6] opacity-20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
