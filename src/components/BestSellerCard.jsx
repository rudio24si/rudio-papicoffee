import React from "react";

export default function BestSellerCard() {
  return (
    <div className="row-span-2 bg-white rounded-xl p-[18px] border border-gray-100">
      <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
        Menu Terlaris
      </p>
      {[
        { img: "🧊", name: "Aren Latte", sold: "52 cups" },
        { img: "☕", name: "Americano", sold: "38 cups" },
        { img: "🍵", name: "Matcha Berry", sold: "21 cups" },
        { img: "🥐", name: "Croissant", sold: "15 pcs" },
      ].map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-none"
        >
          <div className="w-10 h-10 bg-[#C0FCF8] rounded-lg flex items-center justify-center text-lg">
            {item.img}
          </div>
          <div>
            <p className="font-bold text-[13px] text-[#525252]">{item.name}</p>
            <p className="text-[11px] text-gray-400">{item.sold} terjual</p>
          </div>
        </div>
      ))}
    </div>
  );
}
