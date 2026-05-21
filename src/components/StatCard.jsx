import React from "react";

export default function StatCard({ label, value, growth, growthType }) {
  return (
    <div
      className={`bg-white rounded-xl p-[18px] border border-gray-100 flex flex-col justify-between ${growthType === "primary" ? "bg-[#00403C]" : ""}`}
    >
      <div>
        <p
          className={`text-[11px] font-medium mb-[6px] ${growthType === "primary" ? "text-[#B6D76D]" : "text-[#737373]"}`}
        >
          {label}
        </p>
        <p
          className={`text-[22px] font-bold ${growthType === "primary" ? "text-white" : "text-[#00403C]"}`}
        >
          {value}
        </p>
      </div>
      {growth && (
        <p
          className={`text-[11px] font-semibold mt-2 ${
            growthType === "up"
              ? "text-[#00AAA6]"
              : growthType === "alert"
                ? "text-red-500"
                : growthType === "primary"
                  ? "text-[#C0FCF8]"
                  : "text-[#A68BFF]"
          }`}
        >
          {growth}
        </p>
      )}
    </div>
  );
}   