import React from "react";
import StatCard from "../components/StatCard";
import SalesChartCard from "../components/SalesChartCard";
import CoffeeStockCard from "../components/CoffeeStockCard";
import BestSellerCard from "../components/BestSellerCard";
import RecentTransactionsCard from "../components/RecentTransactionsCard";

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

        {/* CHART*/}
        <SalesChartCard />

        {/* PERSEDIAAN BIJI KOPI */}
        <CoffeeStockCard />

        {/* MENU TERLARIS (VERTICAL SPAN) */}
        <BestSellerCard />

        {/* TRANSAKSI TERAKHIR (HORIZONTAL SPAN) */}
        <RecentTransactionsCard />
      </div>
    </div>
  );
};

export default Dashboard;
