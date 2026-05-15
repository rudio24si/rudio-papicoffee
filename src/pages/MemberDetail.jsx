import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Calendar,
  Coffee,
  MessageCircle,
  Star,
  ShieldCheck,
} from "lucide-react";
import membersData from "../data/members.json"; // Sesuaikan path

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Cari data member berdasarkan ID dari URL
  const member = membersData.find((m) => m.id === parseInt(id));

  if (!member) {
    return <div className="p-20 text-center">Member tidak ditemukan.</div>;
  }

  return (
    <div className="p-[20px] bg-[#F5F5F5] min-h-full space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#00AAA6] font-bold text-sm hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft size={18} /> Kembali ke Daftar Member
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Profil Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="h-24 bg-[#00403C]"></div>
            <div className="px-6 pb-6">
              <div className="relative flex justify-center">
                <div className="absolute -top-12 w-24 h-24 rounded-2xl bg-[#B6D76D] border-4 border-white flex items-center justify-center text-[#00403C] text-3xl font-black shadow-lg">
                  {member.name.charAt(0)}
                </div>
              </div>
              <div className="mt-14 text-center">
                <h3 className="text-xl font-bold text-[#00403C] font-['Poppins']">
                  {member.name}
                </h3>
                <span
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    member.status === "Platinum"
                      ? "bg-[#00403C] text-[#C0FCF8]"
                      : member.status === "Gold"
                        ? "bg-[#B6D76D] text-[#00403C]"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {member.status} Member
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-sm text-[#525252]">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#00AAA6]">
                    <Mail size={16} />
                  </div>
                  {member.email}
                </div>
                <div className="flex items-center gap-4 text-sm text-[#525252]">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#00AAA6]">
                    <MapPin size={16} />
                  </div>
                  Jakarta, Indonesia
                </div>
                <div className="flex items-center gap-4 text-sm text-[#525252]">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#00AAA6]">
                    <Calendar size={16} />
                  </div>
                  Joined: 15 May 2023
                </div>
              </div>

              <button className="w-full mt-8 bg-[#00403C] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#00302d]">
                <MessageCircle size={18} /> Kirim WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Aktivitas & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Total Loyalitas
              </p>
              <div className="flex items-end gap-2 mt-2">
                <h4 className="text-3xl font-bold text-[#00403C]">
                  {member.points.toLocaleString()}
                </h4>
                <p className="text-xs font-bold text-[#00AAA6] pb-1">Points</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Total Kunjungan
              </p>
              <div className="flex items-end gap-2 mt-2">
                <h4 className="text-3xl font-bold text-[#00403C]">
                  {member.visits}
                </h4>
                <p className="text-xs font-bold text-[#00AAA6] pb-1">Times</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-bold text-[#00403C] font-['Poppins'] mb-6 flex items-center gap-2">
              <Coffee size={20} className="text-[#00AAA6]" /> Riwayat Transaksi
              Terakhir
            </h4>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 border border-gray-50 rounded-xl hover:bg-gray-50"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-[#F0FAF9] rounded-lg flex items-center justify-center text-[#00AAA6]">
                      <Star size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#525252]">
                        Caramel Macchiato + Brownies
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Order #INV-2024-00{i + 1} • 24 May 2024
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#00403C]">
                      Rp 75.000
                    </p>
                    <p className="text-[10px] font-bold text-[#00AAA6] uppercase">
                      +15 Pts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
