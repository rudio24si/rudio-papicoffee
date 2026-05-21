import React from "react";
import { Zap, Award, Star } from "lucide-react";

const LoyaltyOverview = ({ points, rate, totalItems, topItem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Poin Beredar */}
      <div className="bg-[#00403C] p-5 rounded-xl text-white relative overflow-hidden">
        <Zap className="absolute right-[-10px] top-[-10px] w-20 h-20 text-[#00AAA6] opacity-20" />
        <p className="text-[10px] font-bold text-[#B6D76D] uppercase tracking-wider">
          Poin Beredar
        </p>
        <h3 className="text-2xl font-bold mt-1">{points.toLocaleString()}</h3>
        <p className="text-[10px] text-[#C0FCF8] mt-2 font-medium">
          Total poin di tangan pelanggan
        </p>
      </div>

      {/* Redemption Rate */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase">
          Redemption Rate
        </p>
        <h3 className="text-2xl font-bold text-[#00403C] mt-1">{rate}%</h3>
        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
          <div
            className="bg-[#00AAA6] h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${rate}%` }}
          ></div>
        </div>
      </div>

      {/* Total Rewards */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
        <div className="w-10 h-10 bg-[#FFF7ED] text-[#F97316] rounded-lg flex items-center justify-center">
          <Award size={22} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            Total Rewards
          </p>
          <h3 className="text-xl font-bold text-[#00403C]">
            {totalItems} Item
          </h3>
        </div>
      </div>

      {/* Top Reward */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
        <div className="w-10 h-10 bg-[#F0FAF9] text-[#00AAA6] rounded-lg flex items-center justify-center">
          <Star size={22} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            Top Reward
          </p>
          <h3 className="text-xl font-bold text-[#00403C]">{topItem}</h3>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyOverview;
