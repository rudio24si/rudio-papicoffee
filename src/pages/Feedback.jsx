import React from "react";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  MessageCircle,
  MoreVertical,
} from "lucide-react";

export default function Feedback() {
  const reviews = [
    {
      user: "Andi Herlambang",
      rating: 5,
      comment:
        "Aren Latte-nya juara! Kopinya terasa kuat tapi tetap creamy. Suasana kedai juga tenang untuk kerja.",
      date: "2 jam yang lalu",
      status: "Positive",
    },
    {
      user: "Siti Sarah",
      rating: 4,
      comment:
        "Croissant-nya enak sekali, tapi tadi pelayanannya agak sedikit lama karena antrian ramai.",
      date: "5 jam yang lalu",
      status: "Neutral",
    },
    {
      user: "Budi Santoso",
      rating: 5,
      comment: "Selalu suka sama packaging Takeaway-nya, rapi dan aman.",
      date: "Kemarin",
      status: "Positive",
    },
  ];

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Feedback Pelanggan
          </h2>
          <p className="text-sm text-[#737373]">
            Dengarkan suara pelanggan untuk meningkatkan kualitas layanan.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold text-[#525252] hover:bg-gray-50">
            <Filter size={18} className="text-[#00AAA6]" /> Filter Rating
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#00403C] p-5 rounded-xl text-white">
          <p className="text-[10px] font-bold text-[#B6D76D] uppercase tracking-wider">
            Average Rating
          </p>
          <div className="flex items-center gap-2 mt-1">
            <h3 className="text-3xl font-bold">4.8</h3>
            <div className="flex text-[#B6D76D]">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>
          <p className="text-[10px] text-[#C0FCF8] mt-2 italic">
            Berdasarkan 1,240 ulasan
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            Customer Sentiment
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-[#00AAA6]">
              <ThumbsUp size={18} />
              <span className="font-bold">92%</span>
            </div>
            <div className="flex items-center gap-1 text-red-400">
              <ThumbsDown size={18} />
              <span className="font-bold">8%</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 flex overflow-hidden">
            <div className="bg-[#00AAA6] h-full w-[92%]"></div>
            <div className="bg-red-400 h-full w-[8%]"></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-xl flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              New Reviews
            </p>
            <p className="text-xl font-bold text-[#00403C]">+12 Hari Ini</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#C0FCF8] text-[#00AAA6] rounded-xl flex items-center justify-center">
            <MessageCircle size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Response Rate
            </p>
            <p className="text-xl font-bold text-[#00403C]">100%</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-bold font-['Poppins'] text-[#00403C] px-1">
          Ulasan Terbaru
        </h3>

        <div className="grid gap-4">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#B6D76D] flex items-center justify-center font-bold text-[#00403C]">
                    {rev.user.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-[#00403C]">{rev.user}</p>
                      <div className="flex text-[#FFC107]">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={12}
                            fill={index < rev.rating ? "currentColor" : "none"}
                            className={
                              index < rev.rating ? "" : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {rev.date}
                    </p>
                    <p className="text-sm text-[#525252] mt-3 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-[11px] font-bold text-[#00AAA6] bg-[#F0FAF9] px-3 py-1.5 rounded-lg hover:bg-[#00AAA6] hover:text-white transition-colors">
                    BALAS REVIEW
                  </button>
                  <button className="text-gray-300 hover:text-gray-500">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button className="text-xs font-bold text-[#00AAA6] hover:underline">
          Tampilkan Lebih Banyak
        </button>
      </div>
    </div>
  );
}
