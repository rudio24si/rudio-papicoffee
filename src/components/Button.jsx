import React from "react";

export default function Button({ children }) {
  return (
    <button className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d] transition-all">
      {children}
    </button>
  );
}
