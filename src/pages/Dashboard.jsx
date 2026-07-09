import React, { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import SalesChartCard from "../components/SalesChartCard";
import CoffeeStockCard from "../components/CoffeeStockCard";
import BestSellerCard from "../components/BestSellerCard";
import RecentTransactionsCard from "../components/RecentTransactionsCard";
import { membersAPI } from "../services/membersAPI";
import { ordersAPI } from "../services/ordersAPI";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersData, ordersData] = await Promise.all([
          membersAPI.getAll(),
          ordersAPI.getAll(),
        ]);
        setMembers(membersData);
        setOrders(ordersData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Kalkulasi Metrik ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Orders hari ini
  const todayOrders = orders.filter((o) => {
    const orderDate = new Date(o.created_at);
    return orderDate >= today;
  });

  // Total omzet hari ini (hanya status Lunas)
  const todayRevenue = todayOrders
    .filter((o) => o.status === "Lunas")
    .reduce((sum, o) => sum + (o.total_price || 0), 0);

  // Total cup terjual hari ini (estimasi dari jumlah order)
  const todayCups = todayOrders.length;

  // Member baru hari ini
  const newMembersToday = members.filter((m) => {
    const joined = new Date(m.joined_at);
    return joined >= today;
  }).length;

  // Hitung omzet kemarin untuk growth
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayOrders = orders.filter((o) => {
    const orderDate = new Date(o.created_at);
    return orderDate >= yesterday && orderDate < today;
  });
  const yesterdayRevenue = yesterdayOrders
    .filter((o) => o.status === "Lunas")
    .reduce((sum, o) => sum + (o.total_price || 0), 0);

  const revenueGrowth =
    yesterdayRevenue > 0
      ? Math.round(((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100)
      : 0;

  return (
    <div className="flex-1 overflow-y-auto p-[18px] bg-[#F5F5F5]">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="w-8 h-8 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-[14px]">
          {/* ROW 1: STATS */}
          <StatCard
            label="Omzet Hari Ini"
            value={`Rp ${todayRevenue.toLocaleString("id-ID")}`}
            growth={`${revenueGrowth >= 0 ? "▲" : "▼"} ${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth}% dari kemarin`}
            growthType={revenueGrowth >= 0 ? "up" : "alert"}
          />
          <StatCard
            label="Total Cup Terjual"
            value={todayCups.toString()}
            growth="Pesanan hari ini"
            growthType="info"
          />
          <StatCard
            label="Total Member"
            value={members.length.toString()}
            growth={`Avg. ${members.length > 0 ? Math.round(members.reduce((s, m) => s + (m.points || 0), 0) / members.length) : 0} pts`}
            growthType="info"
          />
          <StatCard
            label="Member Baru"
            value={newMembersToday.toString()}
            growth="Target: 20/hari"
            growthType="primary"
          />

          {/* CHART*/}
          <SalesChartCard orders={todayOrders} />

          {/* PERSEDIAAN BIJI KOPI */}
          <CoffeeStockCard />

          {/* MENU TERLARIS (VERTICAL SPAN) */}
          <BestSellerCard orders={orders} />

          {/* TRANSAKSI TERAKHIR (HORIZONTAL SPAN) */}
          <RecentTransactionsCard orders={orders.slice(0, 3)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
