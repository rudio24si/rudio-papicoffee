import React from "react";
import {
  Gift,
  Award,
  Zap,
  ChevronRight,
  Search,
  Ticket,
  Star,
} from "lucide-react";

export default function Loyalty() {
  const rewards = [
    {
      title: "Gratis 1 Aren Latte",
      points: "500 pts",
      stock: 12,
      category: "Beverage",
    },
    {
      title: "Diskon 50% All Beans",
      points: "1.200 pts",
      stock: 5,
      category: "Beans",
    },
    {
      title: "Voucher Rp 50.000",
      points: "2.000 pts",
      stock: 8,
      category: "Voucher",
    },
    {
      title: "Buy 1 Get 1 Croissant",
      points: "350 pts",
      stock: 20,
      category: "Pastry",
    },
  ];

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Loyalty Program
          </h2>
          <p className="text-sm text-[#737373]">
            Kelola poin pelanggan dan pengaturan hadiah penukaran.
          </p>
        </div>
        <button className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d] transition-all">
          <Ticket size={18} /> Buat Reward Baru
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#00403C] p-5 rounded-xl text-white relative overflow-hidden">
          <Zap className="absolute right-[-10px] top-[-10px] w-20 h-20 text-[#00AAA6] opacity-20" />
          <p className="text-[10px] font-bold text-[#B6D76D] uppercase tracking-wider">
            Poin Beredar
          </p>
          <h3 className="text-2xl font-bold mt-1">428.500</h3>
          <p className="text-[10px] text-[#C0FCF8] mt-2 font-medium">
            Total poin di tangan pelanggan
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col justify-between">
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            Redemption Rate
          </p>
          <h3 className="text-2xl font-bold text-[#00403C] mt-1">68%</h3>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
            <div className="bg-[#00AAA6] h-1.5 rounded-full w-[68%]"></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FFF7ED] text-[#F97316] rounded-lg flex items-center justify-center">
            <Award size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Total Rewards
            </p>
            <h3 className="text-xl font-bold text-[#00403C]">24 Item</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#F0FAF9] text-[#00AAA6] rounded-lg flex items-center justify-center">
            <Star size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Top Reward
            </p>
            <h3 className="text-xl font-bold text-[#00403C]">Aren Latte</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Rewards List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-[#00403C] font-['Poppins']">
              Katalog Hadiah Aktif
            </h3>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Cari reward..."
                className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs outline-none focus:border-[#00AAA6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:border-[#00AAA6] transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-[#C0FCF8] rounded-xl flex items-center justify-center text-[#00AAA6] group-hover:bg-[#00AAA6] group-hover:text-white transition-colors">
                  <Gift size={28} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-[#00AAA6] uppercase">
                    {reward.category}
                  </p>
                  <h4 className="font-bold text-[#525252] text-sm">
                    {reward.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#00403C] font-bold text-xs">
                      {reward.points}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Stok: {reward.stock}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-gray-300 group-hover:text-[#00AAA6]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Redemptions */}
        <div className="space-y-4">
          <h3 className="font-bold text-[#00403C] font-['Poppins'] px-1">
            Penukaran Terakhir
          </h3>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
            {[
              { user: "Andi H.", item: "Aren Latte", time: "2m ago" },
              { user: "Sarah S.", item: "Croissant", time: "15m ago" },
              { user: "Budi S.", item: "Rp 50k Voucher", time: "1h ago" },
              { user: "Rina W.", item: "Aren Latte", time: "3h ago" },
            ].map((log, i) => (
              <div
                key={i}
                className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-[#00403C]">
                  {log.user.split(" ")[0][0]}
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-[#525252]">
                    {log.user}
                  </p>
                  <p className="text-[11px] text-[#00AAA6] font-medium">
                    {log.log === "Voucher" ? "🎫" : "☕"} {log.item}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400">{log.time}</span>
              </div>
            ))}
            <button className="w-full p-3 text-[11px] font-bold text-[#00AAA6] bg-gray-50/50 hover:bg-gray-100 transition-colors">
              LIHAT SEMUA AKTIVITAS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
