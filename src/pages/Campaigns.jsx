import React from "react";
import {
  Megaphone,
  Send,
  Mail,
  MessageSquare,
  Plus,
  Clock,
  CheckCircle2,
  BarChart3,
  Users,
} from "lucide-react";

export default function Campaigns() {
  const activeCampaigns = [
    {
      name: "Promo Weekend Seru",
      channel: "WhatsApp",
      target: "All Members",
      status: "Scheduled",
      date: "18 Mei 2024",
      icon: <MessageSquare size={18} className="text-[#25D366]" />,
      color: "border-l-[#25D366]",
    },
    {
      name: "Diskon 20% Beans Baru",
      channel: "Email Blast",
      target: "Champions",
      status: "Running",
      date: "Ongoing",
      icon: <Mail size={18} className="text-[#00AAA6]" />,
      color: "border-l-[#00AAA6]",
    },
    {
      name: "Flash Sale Ramadan",
      channel: "App Notification",
      target: "At Risk",
      status: "Completed",
      date: "10 Mei 2024",
      icon: <Megaphone size={18} className="text-[#00403C]" />,
      color: "border-l-[#00403C]",
    },
  ];

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Marketing Campaigns
          </h2>
          <p className="text-sm text-[#737373]">
            Jangkau pelanggan Anda dengan promo dan pesan yang personal.
          </p>
        </div>
        <button className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d] shadow-sm">
          <Plus size={18} /> Buat Campaign Baru
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-xl flex items-center justify-center">
            <Send size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Total Sent
            </p>
            <p className="text-xl font-bold text-[#00403C]">12,402 Pesan</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#B6D76D]/20 text-[#00403C] rounded-xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Read Rate
            </p>
            <p className="text-xl font-bold text-[#00403C]">84.2%</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#C0FCF8] text-[#00AAA6] rounded-xl flex items-center justify-center">
            <BarChart3 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Conversion
            </p>
            <p className="text-xl font-bold text-[#00403C]">12.5%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold font-['Poppins'] text-[#00403C]">
              Daftar Campaign
            </h3>
            <div className="flex gap-2">
              <button className="text-xs font-bold text-[#00AAA6] px-3 py-1 bg-[#F0FAF9] rounded">
                Semua
              </button>
              <button className="text-xs font-bold text-gray-400 px-3 py-1 hover:bg-gray-50 rounded">
                Aktif
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {activeCampaigns.map((camp, i) => (
              <div
                key={i}
                className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 ${camp.color}`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">{camp.icon}</div>
                  <div>
                    <h4 className="font-bold text-[#525252] text-sm">
                      {camp.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {camp.target}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {camp.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter ${
                      camp.status === "Running"
                        ? "bg-[#B6D76D] text-[#00403C]"
                        : camp.status === "Scheduled"
                          ? "bg-[#C0FCF8] text-[#00AAA6]"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {camp.status}
                  </span>
                  <button className="text-gray-300 hover:text-[#00403C]">
                    <Plus className="rotate-45" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Creation Quick View */}
        <div className="bg-[#00403C] rounded-xl p-6 text-white flex flex-col justify-between shadow-lg shadow-[#00403c]/20">
          <div>
            <div className="w-12 h-12 bg-[#00AAA6] rounded-xl flex items-center justify-center mb-6">
              <Megaphone size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold font-['Poppins'] mb-2">
              Campaign Pintar
            </h3>
            <p className="text-xs text-[#C0FCF8] leading-relaxed">
              Gunakan kecerdasan buatan untuk menentukan waktu terbaik mengirim
              promo ke pelanggan Anda berdasarkan riwayat kunjungan mereka.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#B6D76D] animate-pulse"></div>
              <p className="text-[11px] font-medium text-white/80">
                Waktu disarankan: 09:00 AM
              </p>
            </div>
            <button className="w-full bg-[#B6D76D] text-[#00403C] py-3 rounded-lg font-bold text-sm hover:scale-[1.02] transition-transform">
              Mulai Campaign AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
