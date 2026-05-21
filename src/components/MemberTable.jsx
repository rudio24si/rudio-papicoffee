import React from "react";
import { Search, MoreHorizontal } from "lucide-react";

const MemberTable = ({
  members,
  totalMembers,
  searchTerm,
  onSearchChange,
  onRowClick,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      {/* SEARCH BAR */}
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#00AAA6] focus:ring-1 focus:ring-[#00AAA6] transition-all"
          />
        </div>
      </div>

      {/* TABLE BODY */}
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
            {members.map((member) => (
              <tr
                key={member.id}
                onClick={() => onRowClick && onRowClick(member.id)}
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
                  <button
                    onClick={(e) => e.stopPropagation()} // Supaya tidak menembus ke onClick miliknya <tr>
                    className="p-2 text-gray-300 hover:text-[#00403C] hover:bg-white rounded-lg transition-all"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER COUNTER */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
        <p className="text-[11px] text-gray-400 italic">
          Menampilkan {members.length} dari {totalMembers} member setia
        </p>
      </div>
    </div>
  );
};

export default MemberTable;
