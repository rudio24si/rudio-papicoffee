import React from "react";
import {
  Clock,
  CheckCircle2,
  Play,
  Timer,
  Coffee,
  MoreVertical,
  AlertCircle,
} from "lucide-react";

export default function Queue() {
  const inProgress = [
    {
      id: "1025",
      items: "2x Aren Latte",
      table: "T-04",
      time: "5m ago",
      priority: "Normal",
    },
    {
      id: "1026",
      items: "1x V60 Gayo, 1x Croissant",
      table: "Takeaway",
      time: "2m ago",
      priority: "High",
    },
    {
      id: "1027",
      items: "1x Matcha Berry",
      table: "T-02",
      time: "Just now",
      priority: "Normal",
    },
  ];

  const ready = [
    {
      id: "1024",
      items: "1x Americano",
      table: "T-08",
      time: "Ready",
      code: "A1",
    },
    {
      id: "1023",
      items: "3x Cappuccino",
      table: "Takeaway",
      time: "Ready",
      code: "B5",
    },
  ];

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Antrian Pesanan
          </h2>
          <p className="text-sm text-[#737373]">
            Pantau kecepatan servis dan status pesanan pelanggan.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#00AAA6] rounded-full animate-pulse"></div>
              <span className="text-[11px] font-bold text-[#00403C]">
                AVG. SERVICE: 4.5m
              </span>
            </div>
          </div>
          <button className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d]">
            <Play size={16} fill="currentColor" /> Buka Antrian Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: In Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold font-['Poppins'] text-[#00403C] flex items-center gap-2">
              <Timer size={20} className="text-[#F97316]" /> Sedang Disiapkan
              <span className="ml-2 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                {inProgress.length}
              </span>
            </h3>
          </div>

          <div className="space-y-3">
            {inProgress.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group"
              >
                {order.priority === "High" && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                )}
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-lg flex items-center justify-center">
                      <Coffee size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[#00403C]">
                          Order #{order.id}
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-500">
                          {order.table}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[#525252] mt-1">
                        {order.items}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                        <Clock size={10} /> Masuk {order.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button className="p-1 text-gray-300 hover:text-gray-500">
                      <MoreVertical size={18} />
                    </button>
                    <button className="bg-[#B6D76D] text-[#00403C] text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-[#a5c55d] transition-colors">
                      SELESAI
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Ready for Pickup */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold font-['Poppins'] text-[#00403C] flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#00AAA6]" /> Siap Diambil
              <span className="ml-2 bg-[#C0FCF8] text-[#00AAA6] text-[10px] px-2 py-0.5 rounded-full">
                {ready.length}
              </span>
            </h3>
          </div>

          <div className="space-y-3">
            {ready.map((order) => (
              <div
                key={order.id}
                className="bg-[#00403C] p-4 rounded-xl shadow-lg shadow-[#00403c]/10 relative overflow-hidden border border-[#00403c]"
              >
                <div className="absolute right-[-10px] top-[-10px] opacity-10 text-white">
                  <CheckCircle2 size={80} />
                </div>
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 bg-[#B6D76D] text-[#00403C] rounded-full flex items-center justify-center font-black text-xl">
                      {order.code}
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase text-xs tracking-widest opacity-70">
                        Order #{order.id}
                      </p>
                      <p className="font-bold text-[#C0FCF8] text-lg">
                        {order.table}
                      </p>
                      <p className="text-[11px] text-[#B6D76D] font-medium mt-1">
                        {order.items}
                      </p>
                    </div>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-4 py-2 rounded-lg border border-white/20 transition-colors uppercase tracking-wider">
                    Panggil Pelanggan
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State / Info */}
            <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center">
              <AlertCircle size={32} className="text-gray-300 mb-2" />
              <p className="text-[11px] font-medium text-gray-400">
                Pesanan yang sudah diambil akan otomatis pindah ke Riwayat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
