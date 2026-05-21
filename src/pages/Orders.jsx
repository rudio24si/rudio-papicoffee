import React, { useState } from "react";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");

  // Data dummy pesanan
  const ordersData = [
    {
      id: "1024",
      items: "Aren Latte, Almond Croissant",
      time: "2 mins ago",
      price: "Rp 65.000",
      status: "Lunas",
    },
    {
      id: "1023",
      items: "V60 Manual Brew",
      time: "10 mins ago",
      price: "Rp 35.000",
      status: "Lunas",
    },
    {
      id: "1022",
      items: "Cappuccino (Oat Milk)",
      time: "15 mins ago",
      price: "Rp 42.000",
      status: "Lunas",
    },
  ];

  // Logic untuk memfilter ID pesanan berdasarkan input search bar
  const filteredOrders = ordersData.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCardClick = (id) => {
    console.log(`Buka detail untuk order #${id}`);
    // Kamu bisa pasang fungsi detail modal atau navigasi router di sini
  };

  const handleMenuClick = (id) => {
    console.log(`Aksi menu untuk order #${id}`);
  };

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-xl font-bold font-['Poppins'] text-[#00403C]">
          Riwayat Pesanan
        </h2>
        <p className="text-xs text-gray-400">
          Kelola dan pantau semua transaksi masuk pelanggan
        </p>
      </div>

      {/* ORDERS LIST CONTENT */}
      <div className="space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCardClick={handleCardClick}
              onMenuClick={handleMenuClick}
            />
          ))
        ) : (
          <div className="text-center py-8 text-sm text-gray-400 bg-white rounded-xl border border-gray-100">
            Pesanan tidak ditemukan
          </div>
        )}
      </div>

      {/* PAGINATION SIMPLE */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => console.log("Load more data...")}
          className="text-xs font-bold text-[#00AAA6] hover:underline"
        >
          Tampilkan Lebih Banyak
        </button>
      </div>
    </div>
  );
}
