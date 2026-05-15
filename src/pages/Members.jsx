import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Star,
  Search,
  MoreHorizontal,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import membersData from "../data/members.json";

export default function Members() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Inisialisasi navigate

  // Fungsi Filter Pencarian
  const filteredMembers = membersData.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Database Member
          </h2>
          <p className="text-sm text-[#737373]">
            Mengelola {membersData.length} total pelanggan setia Papi Coffee.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold text-[#525252] hover:bg-gray-50 transition-all">
            <Download size={18} className="text-[#00AAA6]" /> Export CSV
          </button>
          <button className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d] transition-all">
            <UserPlus size={18} /> Tambah Member
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-full flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Total Members
            </p>
            <p className="text-xl font-bold text-[#00403C]">
              {membersData.length} Pelanggan
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#FFF7ED] text-[#F97316] rounded-full flex items-center justify-center">
            <Star size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Avg. Points
            </p>
            <p className="text-xl font-bold text-[#00403C]">1.240 pts</p>
          </div>
        </div>

        <div className="bg-[#B6D76D] p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#00403C] text-white rounded-full flex items-center justify-center">
            <UserPlus size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#00403C]/60 uppercase tracking-wider">
              Growth
            </p>
            <p className="text-xl font-bold text-[#00403C]">+12.5%</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#00AAA6] focus:ring-1 focus:ring-[#00AAA6] transition-all"
            />
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-100">
              <tr className="text-[11px] text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Member</th>
                <th className="px-6 py-4 font-semibold">Tier</th>
                <th className="px-6 py-4 font-semibold">Kunjungan</th>
                <th className="px-6 py-4 font-semibold">Points</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  onClick={() => navigate(`/members/${member.id}`)} // Aksi Navigasi saat baris ditekan
                  className="hover:bg-[#F0FAF9] cursor-pointer transition-colors text-[13px] group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-white
                        ${member.status === "Platinum" ? "bg-[#00403C]" : member.status === "Gold" ? "bg-[#00AAA6]" : "bg-gray-400"}`}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[#525252] group-hover:text-[#00403C]">
                          {member.name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        member.status === "Platinum"
                          ? "bg-[#00403C] text-[#C0FCF8]"
                          : member.status === "Gold"
                            ? "bg-[#B6D76D] text-[#00403C]"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#737373]">{member.visits}x</td>
                  <td className="px-6 py-4 font-bold text-[#00403C]">
                    {member.points.toLocaleString()} pts
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-300 hover:text-[#00403C] hover:bg-white rounded-lg transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-400 italic">
            Menampilkan {filteredMembers.length} dari {membersData.length}{" "}
            member setia
          </p>
        </div>
      </div>
    </div>
  );
}
