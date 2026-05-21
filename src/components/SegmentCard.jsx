import React from "react";
import { UserCheck } from "lucide-react";

const SegmentCard = ({ segment, onClick }) => {
  const { name, count, percentage, desc, color, textColor } = segment;

  return (
    <div
      onClick={() => onClick && onClick(segment)}
      className="p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:translate-y-[-4px] cursor-pointer bg-white"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color} ${textColor}`}>
          <UserCheck size={20} />
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded ${color} ${textColor}`}
        >
          {percentage}
        </span>
      </div>
      <h4 className="font-bold text-[#00403C] text-lg">{name}</h4>
      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed h-8 line-clamp-2">
        {desc}
      </p>
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
        <span className="text-xl font-bold text-[#525252]">
          {count.toLocaleString()}
        </span>
        <span className="text-[10px] text-gray-400 font-medium">Orang</span>
      </div>
    </div>
  );
};

export default SegmentCard;
