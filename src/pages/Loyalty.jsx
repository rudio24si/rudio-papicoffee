import React, { useState } from "react";
import { Search, Ticket } from "lucide-react";
import LoyaltyOverview from "../components/LoyaltyOverview";
import RewardCard from "../components/RewardCard";
import RecentRedemptions from "../components/RecentRedemptions";

export default function Loyalty() {
  const [searchTerm, setSearchTerm] = useState("");

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

  const redemptionLogs = [
    {
      user: "Andi H.",
      item: "Aren Latte",
      category: "Beverage",
      time: "2m ago",
    },
    {
      user: "Sarah S.",
      item: "Croissant",
      category: "Pastry",
      time: "15m ago",
    },
    {
      user: "Budi S.",
      item: "Rp 50k Voucher",
      category: "Voucher",
      time: "1h ago",
    },
    {
      user: "Rina W.",
      item: "Aren Latte",
      category: "Beverage",
      time: "3h ago",
    },
  ];

  // Logic pencarian reward
  const filteredRewards = rewards.filter(
    (reward) =>
      reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* 1. HEADER SECTION */}
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

      {/* 2. OVERVIEW METRICS */}
      <LoyaltyOverview
        points={428500}
        rate={68}
        totalItems={24}
        topItem="Aren Latte"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COMPONENT: KATALOG HADIAH */}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs outline-none focus:border-[#00AAA6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRewards.map((reward, i) => (
              <RewardCard
                key={i}
                reward={reward}
                onClick={(item) => console.log("Detail reward:", item.title)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COMPONENT: AKTIVITAS PENUKARAN TERAKHIR */}
        <RecentRedemptions
          logs={redemptionLogs}
          onViewAll={() => console.log("Buka halaman log aktivitas")}
        />
      </div>
    </div>
  );
}
  