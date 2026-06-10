import React from "react";
import Button from "./Button";
import { Input } from "./ui/input";

const Header = () => {
  return (
    <header className="bg-white p-[14px_22px] flex items-center justify-between border-b border-gray-100 gap-3 shrink-0">
      <div>
        <h1 className="text-[18px] font-['Poppins'] font-semibold text-[#525252]">
          Ringkasan Toko
        </h1>
        <p className="text-[12px] text-gray-400">
          Coffee is brewing, James! Siap untuk shift pagi?
        </p>
      </div>

      <div className="rounded-xl px-[14px] py-[8px] flex items-center gap-2 text-gray-400 text-[13px] flex-1 max-w-[280px]">
        <i className="ti ti-search"></i>
        <Input placeholder="Cari transaksi atau stok..." />
      </div>

      <Button>Transaksi Baru</Button>
    </header>
  );
};

export default Header;
