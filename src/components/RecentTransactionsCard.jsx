import React from "react";
// 1. Import komponen Table dari shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RecentTransactionsCard() {
  return (
    <div className="col-span-3 bg-white rounded-xl p-[18px] border border-gray-100">
      <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
        Transaksi Terakhir
      </p>

      {/* 2. Gunakan komponen Table shadcn */}
      <Table className="text-[12px]">
        <TableHeader>
          <TableRow className="text-[11px] text-gray-400 uppercase hover:bg-transparent">
            <TableHead className="w-[100px] font-semibold text-gray-400 h-10 px-2">
              ID Order
            </TableHead>
            <TableHead className="font-semibold text-gray-400 h-10">
              Menu Pesanan
            </TableHead>
            <TableHead className="font-semibold text-gray-400 h-10">
              Waktu
            </TableHead>
            <TableHead className="font-semibold text-gray-400 h-10">
              Harga
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-400 h-10 px-2">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[1024, 1023, 1022].map((id) => (
            <TableRow
              key={id}
              className="hover:bg-gray-50/80 transition-colors"
            >
              <TableCell className="font-bold py-4 px-2">#{id}</TableCell>
              <TableCell className="text-[#737373] py-4">
                Aren Latte, Almond Croissant
              </TableCell>
              <TableCell className="text-gray-400 py-4">10:42 AM</TableCell>
              <TableCell className="font-bold text-[#00403C] py-4">
                Rp 65.000
              </TableCell>
              <TableCell className="text-right py-4 px-2">
                <span className="bg-[#B6D76D] text-[#00403C] px-3 py-1 rounded-full text-[10px] font-bold uppercase inline-block">
                  Lunas
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
