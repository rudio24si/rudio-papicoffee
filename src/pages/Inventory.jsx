import { Package, Plus, Search, AlertTriangle } from "lucide-react";

export default function Inventory() {
  const items = [
    {
      name: "Velvet Espresso",
      category: "Coffee",
      stock: 45,
      status: "In Stock",
    },
    {
      name: "Golden Honey",
      category: "Coffee",
      stock: 12,
      status: "Low Stock",
    },
    {
      name: "Paper Filter v60",
      category: "Equipment",
      stock: 0,
      status: "Out of Stock",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search inventory..."
          className="outline-none w-full text-sm"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Item Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-gray-500">{item.category}</td>
                <td className="p-4">{item.stock} units</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
