import { Filter, MoreVertical, Package } from "lucide-react";

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders History</h2>
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="text-gray-400" />
              </div>
              <div>
                <p className="font-semibold">Order #INV-2024-{i}</p>
                <p className="text-xs text-gray-500">2 mins ago • 3 Items</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-6">
              <div>
                <p className="font-bold">$45.00</p>
                <p className="text-xs text-green-600 font-medium">Paid</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
