import React from "react";
import SegmentCard from "../components/SegmentCard";
import RfmDistribution from "../components/RfmDistribution";
import CampaignBanner from "../components/CampaignBanner";
import { Target } from "lucide-react";

export default function Segmentation() {
  // Data State Segmen Pelanggan
  const segmentsData = [
    {
      name: "Champions",
      count: 420,
      percentage: "15%",
      desc: "Belanja baru-baru ini, sangat sering, dan paling banyak.",
      color: "bg-[#00403C]",
      textColor: "text-[#C0FCF8]",
    },
    {
      name: "Loyal Customers",
      count: 850,
      percentage: "30%",
      desc: "Pelanggan setia yang sering melakukan pembelian.",
      color: "bg-[#B6D76D]",
      textColor: "text-[#00403C]",
    },
    {
      name: "At Risk",
      count: 120,
      percentage: "4%",
      desc: "Sudah lama tidak belanja, perlu penanganan khusus.",
      color: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      name: "New Members",
      count: 240,
      percentage: "8.5%",
      desc: "Pelanggan baru yang bergabung bulan ini.",
      color: "bg-[#F0FAF9]",
      textColor: "text-[#00AAA6]",
    },
  ];

  // Data Analitik Distribusi RFM
  const rfmAnalytics = [
    {
      label: "Champions",
      matchPercentage: 85,
      monetaryWidth: 70,
      frequencyWidth: 15,
    },
    {
      label: "Loyal",
      matchPercentage: 70,
      monetaryWidth: 60,
      frequencyWidth: 15,
    },
    {
      label: "Potential",
      matchPercentage: 55,
      monetaryWidth: 50,
      frequencyWidth: 15,
    },
    {
      label: "At Risk",
      matchPercentage: 40,
      monetaryWidth: 40,
      frequencyWidth: 15,
    },
  ];

  const handleSegmentClick = (segment) => {
    console.log("Membuka data detail untuk segmen:", segment.name);
  };

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Segmentasi Pelanggan
          </h2>
          <p className="text-sm text-[#737373]">
            Pahami kelompok pelanggan untuk strategi marketing yang lebih
            personal.
          </p>
        </div>
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold text-[#525252] hover:bg-gray-50 transition-all">
          <Target size={18} className="text-[#00AAA6]" /> Atur Rule Segmentasi
        </button>
      </div>

      {/* SEGMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segmentsData.map((seg, i) => (
          <SegmentCard key={i} segment={seg} onClick={handleSegmentClick} />
        ))}
      </div>

      {/* LOWER CONTENT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ANALYTICS */}
        <RfmDistribution rfmData={rfmAnalytics} />

        {/* CAMPAIGN BANNER */}
        <CampaignBanner
          targetCount={120}
          targetSegment="At Risk"
          onRunCampaign={() =>
            console.log("Menjalankan WhatsApp/Email Blast...")
          }
        />
      </div>
    </div>
  );
}
