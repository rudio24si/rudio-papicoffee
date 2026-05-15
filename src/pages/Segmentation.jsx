import React from "react";
import {
  ChartPie,
  Users,
  TrendingUp,
  Target,
  ArrowRight,
  UserCheck,
  Zap,
} from "lucide-react";

export default function Segmentation() {
  const segments = [
    {
      name: "Champions",
      count: 420,
      percentage: "15%",
      desc: "Belanja baru-baru ini, sangat sering, dan paling banyak.",
      color: "bg-[#00403C]",
      textColor: "text-[#C0FCF8]",
    },
    {
      name: "Loyal Customers",
      count: 850,
      percentage: "30%",
      desc: "Pelanggan setia yang sering melakukan pembelian.",
      color: "bg-[#B6D76D]",
      textColor: "text-[#00403C]",
    },
    {
      name: "At Risk",
      count: 120,
      percentage: "4%",
      desc: "Sudah lama tidak belanja, perlu penanganan khusus.",
      color: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      name: "New Members",
      count: 240,
      percentage: "8.5%",
      desc: "Pelanggan baru yang bergabung bulan ini.",
      color: "bg-[#F0FAF9]",
      textColor: "text-[#00AAA6]",
    },
  ];

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Segmentasi Pelanggan
          </h2>
          <p className="text-sm text-[#737373]">
            Pahami kelompok pelanggan untuk strategi marketing yang lebih
            personal.
          </p>
        </div>
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold text-[#525252] hover:bg-gray-50 transition-all">
          <Target size={18} className="text-[#00AAA6]" /> Atur Rule Segmentasi
        </button>
      </div>

      {/* Segment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segments.map((seg, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:translate-y-[-4px] cursor-pointer bg-white`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${seg.color} ${seg.textColor}`}>
                <UserCheck size={20} />
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded ${seg.color} ${seg.textColor}`}
              >
                {seg.percentage}
              </span>
            </div>
            <h4 className="font-bold text-[#00403C] text-lg">{seg.name}</h4>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed h-8 line-clamp-2">
              {seg.desc}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
              <span className="text-xl font-bold text-[#525252]">
                {seg.count}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                Orang
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold font-['Poppins'] text-[#00403C] flex items-center gap-2">
              <TrendingUp size={20} className="text-[#00AAA6]" /> Distribusi
              Nilai RFM
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[10px] text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#00403C]"></div>{" "}
                Monetary
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#B6D76D]"></div>{" "}
                Frequency
              </span>
            </div>
          </div>

          {/* Simple Visualization (Placeholder for Chart) */}
          <div className="space-y-6">
            {["Champions", "Loyal", "Potential", "At Risk"].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#525252]">
                  <span>{item}</span>
                  <span className="text-gray-400">{85 - idx * 15}% Match</span>
                </div>
                <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${80 - idx * 10}%` }}
                    className="bg-[#00403C] h-full"
                  ></div>
                  <div
                    style={{ width: `${15}%` }}
                    className="bg-[#B6D76D] h-full opacity-60"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Action */}
        <div className="bg-[#00403C] p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <Zap className="absolute right-[-20px] top-[-20px] w-32 h-32 text-[#B6D76D] opacity-10" />
          <div className="relative z-10">
            <ChartPie size={32} className="text-[#B6D76D] mb-4" />
            <h3 className="text-xl font-bold text-white font-['Poppins'] leading-tight">
              Siap untuk Blast Promo?
            </h3>
            <p className="text-[#C0FCF8] text-xs mt-3 leading-relaxed">
              Kirimkan pesan personal ke 120 pelanggan <b>At Risk</b> untuk
              mengajak mereka kembali ke kedai hari ini.
            </p>
          </div>

          <button className="relative z-10 mt-6 w-full bg-[#B6D76D] text-[#00403C] py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#a5c55d] transition-all">
            Jalankan Campaign <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
