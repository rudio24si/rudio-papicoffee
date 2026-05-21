import React from "react";
import { TrendingUp } from "lucide-react";

const RfmDistribution = ({ rfmData }) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold font-['Poppins'] text-[#00403C] flex items-center gap-2">
          <TrendingUp size={20} className="text-[#00AAA6]" /> Distribusi Nilai
          RFM
        </h3>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <div className="w-2 h-2 rounded-full bg-[#00403C]"></div> Monetary
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <div className="w-2 h-2 rounded-full bg-[#B6D76D]"></div> Frequency
          </span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-6">
        {rfmData.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#525252]">
              <span>{item.label}</span>
              <span className="text-gray-400">
                {item.matchPercentage}% Match
              </span>
            </div>
            <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${item.monetaryWidth}%` }}
                className="bg-[#00403C] h-full transition-all duration-500"
              ></div>
              <div
                style={{ width: `${item.frequencyWidth}%` }}
                className="bg-[#B6D76D] h-full opacity-60 transition-all duration-500"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RfmDistribution;
