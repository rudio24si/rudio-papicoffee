import React from "react";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const statusStyle = (status) => {
  if (status === "Lunas") return "bg-[#B6D76D] text-[#00403C]";
  if (status === "Pending") return "bg-[#C0FCF8] text-[#00AAA6]";
  return "bg-red-100 text-red-500";
};

export default function RecentTransactionsCard({ orders = [] }) {
  return (
    <div className="col-span-3 bg-white rounded-xl p-[18px] border border-gray-100">
      <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
        Transaksi Terakhir
      </p>

      {orders.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-300">
          Belum ada transaksi
        </div>
      ) : (
        <Table className="text-[12px]">
          <TableHeader>
            <TableRow className="text-[11px] text-gray-400 uppercase hover:bg-transparent">
              <TableHead className="w-[110px] font-semibold text-gray-400 h-10 px-2">ID Order</TableHead>
              <TableHead className="font-semibold text-gray-400 h-10">Pelanggan</TableHead>
              <TableHead className="font-semibold text-gray-400 h-10">Menu Pesanan</TableHead>
              <TableHead className="font-semibold text-gray-400 h-10">Waktu</TableHead>
              <TableHead className="font-semibold text-gray-400 h-10">Harga</TableHead>
              <TableHead className="text-right font-semibold text-gray-400 h-10 px-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50/80 transition-colors">
                <TableCell className="font-bold py-3 px-2 text-[#00403C]">
                  {order.order_number}
                </TableCell>
                <TableCell className="text-[#737373] py-3">
                  {order.member_name || (
                    <span className="text-gray-300 italic text-[11px]">Non-member</span>
                  )}
                </TableCell>
                <TableCell className="text-[#737373] py-3 max-w-[180px] truncate">
                  {order.items}
                </TableCell>
                <TableCell className="text-gray-400 py-3 whitespace-nowrap">
                  {new Date(order.created_at).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell className="font-bold text-[#00403C] py-3 whitespace-nowrap">
                  Rp {order.total_price?.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right py-3 px-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase inline-block ${statusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
