import React from "react";
import { Gift, ChevronRight } from "lucide-react";

const RewardCard = ({ reward, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(reward)}
      className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:border-[#00AAA6] transition-all cursor-pointer group"
    >
      <div className="w-14 h-14 bg-[#C0FCF8] rounded-xl flex items-center justify-center text-[#00AAA6] group-hover:bg-[#00AAA6] group-hover:text-white transition-colors">
        <Gift size={28} />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold text-[#00AAA6] uppercase">
          {reward.category}
        </p>
        <h4 className="font-bold text-[#525252] text-sm">{reward.title}</h4>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[#00403C] font-bold text-xs">
            {reward.points}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            Stok: {reward.stock}
          </span>
        </div>
      </div>
      <ChevronRight
        size={18}
        className="text-gray-300 group-hover:text-[#00AAA6]"
      />
    </div>
  );
};

export default RewardCard;
