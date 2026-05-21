import React from "react";
import { Coffee, MoreVertical } from "lucide-react";

const OrderCard = ({ order, onCardClick, onMenuClick }) => {
  return (
    <div
      onClick={() => onCardClick && onCardClick(order.id)}
      className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex gap-4 items-center">
        <div className="w-12 h-12 bg-[#C0FCF8] rounded-lg flex items-center justify-center text-[#00AAA6]">
          <Coffee size={24} />
        </div>
        <div>
          <p className="font-bold text-[#00403C]">Order #{order.id}</p>
          <p className="text-xs text-[#737373] font-medium">{order.items}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{order.time}</p>
        </div>
      </div>

      <div className="text-right flex items-center gap-8">
        <div>
          <p className="font-bold text-[#00403C] text-lg">{order.price}</p>
          <span className="bg-[#B6D76D] text-[#00403C] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {order.status}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Mencegah onCardClick ikut terpicu
            onMenuClick && onMenuClick(order.id);
          }}
          className="p-2 text-gray-400 hover:bg-gray-100 hover:text-[#00403C] rounded-full transition-colors"
        >
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
