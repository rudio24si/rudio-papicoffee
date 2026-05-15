import React from "react";
import { Filter, MoreVertical, Coffee, Search } from "lucide-react";

export default function Orders() {
  const orders = [
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

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold font-['Poppins'] text-[#00403C]">
            Riwayat Pesanan
          </h2>
          <p className="text-xs text-gray-400">
            Kelola dan pantau semua transaksi masuk pelanggan
          </p>
        </div>

        <div className="flex gap-3">
          {/* Search Bar Tambahan agar sesuai tema topbar */}
          <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 text-gray-400 text-sm w-64">
            <Search size={16} />
            <input
              type="text"
              placeholder="Cari ID pesanan..."
              className="outline-none bg-transparent w-full text-[#525252]"
            />
          </div>
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold text-[#525252] hover:bg-gray-50 transition-all">
            <Filter size={18} className="text-[#00AAA6]" /> Filter
          </button>
        </div>
      </div>

      {/* Orders List Content */}
      <div className="space-y-3">
        {orders.map((order, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex gap-4 items-center">
              {/* Icon menggunakan warna aksen Papi Coffee */}
              <div className="w-12 h-12 bg-[#C0FCF8] rounded-lg flex items-center justify-center text-[#00AAA6]">
                <Coffee size={24} />
              </div>
              <div>
                <p className="font-bold text-[#00403C]">Order #{order.id}</p>
                <p className="text-xs text-[#737373] font-medium">
                  {order.items}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{order.time}</p>
              </div>
            </div>

            <div className="text-right flex items-center gap-8">
              <div>
                <p className="font-bold text-[#00403C] text-lg">
                  {order.price}
                </p>
                <span className="bg-[#B6D76D] text-[#00403C] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {order.status}
                </span>
              </div>
              <button className="p-2 text-gray-400 hover:bg-gray-100 hover:text-[#00403C] rounded-full transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Simple agar tidak ada gap kosong di bawah */}
      <div className="flex justify-center pt-4">
        <button className="text-xs font-bold text-[#00AAA6] hover:underline">
          Tampilkan Lebih Banyak
        </button>
      </div>
    </div>
  );
}
