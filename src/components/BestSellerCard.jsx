import React, { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Parse field "items" jadi array item individual
// Contoh: "Aren Latte, Croissant, Aren Latte" → [{name:"Aren Latte",count:2},{name:"Croissant",count:1}]
function parseItemsFromOrders(orders) {
  const countMap = {};
  orders.forEach((order) => {
    if (!order.items) return;
    const items = order.items.split(",").map((s) => s.trim()).filter(Boolean);
    items.forEach((item) => {
      // Hilangkan prefix qty seperti "2x " atau "1x "
      const cleaned = item.replace(/^\d+x\s*/i, "").trim();
      const qty = parseInt(item.match(/^(\d+)x/i)?.[1] || "1");
      countMap[cleaned] = (countMap[cleaned] || 0) + qty;
    });
  });

  return Object.entries(countMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

const EMOJI_MAP = {
  "aren latte": "🧊",
  "americano": "☕",
  "matcha berry": "🍵",
  "cappuccino": "☕",
  "v60": "☕",
  "croissant": "🥐",
  "donut": "🍩",
  "latte": "☕",
  "espresso": "☕",
};

function getEmoji(name) {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(EMOJI_MAP)) {
    if (lower.includes(key)) return emoji;
  }
  return "🍽️";
}

export default function BestSellerCard({ orders = [] }) {
  const items = useMemo(() => parseItemsFromOrders(orders), [orders]);

  return (
    <div className="row-span-2 bg-white rounded-xl p-[18px] border border-gray-100">
      <p className="font-['Poppins'] font-semibold text-[14px] text-[#00403C] mb-4">
        Menu Terlaris
      </p>

      {items.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-sm text-gray-300">
          Belum ada data
        </div>
      ) : (
        <ScrollArea className="h-[250px] pr-3">
          {items.slice(0, 8).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-none"
            >
              <div className="w-10 h-10 bg-[#C0FCF8] rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                {getEmoji(item.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[13px] text-[#525252] truncate">
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400">{item.count} terjual</p>
              </div>
              {idx === 0 && (
                <span className="text-[9px] font-bold bg-[#B6D76D] text-[#00403C] px-1.5 py-0.5 rounded uppercase flex-shrink-0">
                  #1
                </span>
              )}
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
}
