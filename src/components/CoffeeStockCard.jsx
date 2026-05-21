import React from "react";

export default function CoffeeStockCard() {
  return (
    <div className="bg-white rounded-xl p-[18px] border border-gray-100">
      <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
        Persediaan Biji Kopi
      </p>
      <div className="flex flex-col gap-3 text-[12px]">
        <div className="flex justify-between border-b border-gray-50 pb-1 text-[#737373]">
          <span>House Blend</span>
          <b className="text-[#00403C]">4.2 kg</b>
        </div>
        <div className="flex justify-between border-b border-gray-50 pb-1 text-[#737373]">
          <span>Arabica Gayo</span>
          <b className="text-[#00403C]">1.5 kg</b>
        </div>
        <div className="flex justify-between text-red-500">
          <span>Decaf</span>
          <b>0.2 kg</b>
        </div>
      </div>
    </div>
  );
}
