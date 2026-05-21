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
import Button from "../components/Button";
import MemberTable from "../components/MemberTable";

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
          <Button>
            <Download size={18} className="text-[#00AAA6]" /> Export CSV
          </Button>
          <Button>
            <UserPlus size={18} /> Tambah Member
          </Button>
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
      <MemberTable
        members={filteredMembers}
        totalMembers={membersData.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRowClick={(id) => navigate(`/members/${id}`)}
      />
    </div>
  );
}
