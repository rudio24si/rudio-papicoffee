import React from "react";

export default function RecentTransactionsCard() {
  return (
    <div className="col-span-3 bg-white rounded-xl p-[18px] border border-gray-100">
      <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
        Transaksi Terakhir
      </p>
      <table className="w-full text-left text-[12px]">
        <thead>
          <tr className="text-[11px] text-gray-400 uppercase border-b border-gray-100">
            <th className="pb-3 font-semibold px-2">ID Order</th>
            <th className="pb-3 font-semibold">Menu Pesanan</th>
            <th className="pb-3 font-semibold">Waktu</th>
            <th className="pb-3 font-semibold">Harga</th>
            <th className="pb-3 font-semibold text-right px-2">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[1024, 1023, 1022].map((id) => (
            <tr key={id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 font-bold px-2">#{id}</td>
              <td className="py-4 text-[#737373]">
                Aren Latte, Almond Croissant
              </td>
              <td className="py-4 text-gray-400">10:42 AM</td>
              <td className="py-4 font-bold text-[#00403C]">Rp 65.000</td>
              <td className="py-4 text-right px-2">
                <span className="bg-[#B6D76D] text-[#00403C] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  Lunas
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
