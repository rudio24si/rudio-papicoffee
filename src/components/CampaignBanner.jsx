import React from "react";
import { ChartPie, Zap, ArrowRight } from "lucide-react";

const CampaignBanner = ({ targetCount, targetSegment, onRunCampaign }) => {
  return (
    <div className="bg-[#00403C] p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
      <Zap className="absolute right-[-20px] top-[-20px] w-32 h-32 text-[#B6D76D] opacity-10" />
      <div className="relative z-10">
        <ChartPie size={32} className="text-[#B6D76D] mb-4" />
        <h3 className="text-xl font-bold text-white font-['Poppins'] leading-tight">
          Siap untuk Blast Promo?
        </h3>
        <p className="text-[#C0FCF8] text-xs mt-3 leading-relaxed">
          Kirimkan pesan personal ke {targetCount} pelanggan{" "}
          <b>{targetSegment}</b> untuk mengajak mereka kembali ke kedai hari
          ini.
        </p>
      </div>

      <button
        onClick={onRunCampaign}
        className="relative z-10 mt-6 w-full bg-[#B6D76D] text-[#00403C] py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#a5c55d] transition-all"
      >
        Jalankan Campaign <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default CampaignBanner;
