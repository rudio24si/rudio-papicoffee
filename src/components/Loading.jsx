import { Coffee } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-600 text-sm">Brewing your experience...</p>
    </div>
  );
}
