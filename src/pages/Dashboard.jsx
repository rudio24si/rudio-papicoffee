import {
  DollarSign,
  ShoppingBag,
  Flame,
  Star,
  Download,
  Eye,
} from "lucide-react";

export default function Dashboard() {
  const cards = [
    {
      title: "Total Sales",
      value: "$42,850",
      icon: DollarSign,
      extra: "+12.5%",
    },
    {
      title: "Active Orders",
      value: "184",
      icon: ShoppingBag,
      extra: "Normal",
    },
    {
      title: "Popular Blend",
      value: "Velvet Espresso",
      icon: Flame,
      extra: "Trending",
    },
    {
      title: "Customer Feedback",
      value: "98 Positive",
      icon: Star,
      extra: "4.9 Avg",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 🔥 SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon size={18} />
                </div>
                <span className="text-xs text-gray-500">{card.extra}</span>
              </div>

              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-lg font-semibold">{card.value}</h3>
            </div>
          );
        })}
      </div>

      {/* 📊 CHART + POPULAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Revenue Growth</h3>
            <select className="text-sm border rounded px-2 py-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          {/* Dummy Chart */}
          <div className="h-40 flex items-center justify-center text-gray-400">
            Chart here 📈
          </div>
        </div>

        {/* Popular */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Popular Blends</h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Velvet Espresso</span>
              <span className="text-sm text-gray-500">1.2k</span>
            </div>

            <div className="flex justify-between">
              <span>Golden Honey</span>
              <span className="text-sm text-gray-500">840</span>
            </div>
          </div>

          <button className="mt-4 w-full border py-2 rounded text-sm hover:bg-gray-100">
            View Inventory
          </button>
        </div>
      </div>

      {/* 📋 TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-semibold">Recent Orders</h3>

          <button className="flex items-center gap-2 text-sm">
            <Download size={16} />
            Export
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">#PC-2094</td>
              <td className="p-3">Julianna</td>
              <td className="p-3">$124</td>
              <td className="p-3 text-green-600">Shipped</td>
              <td className="p-3">
                <Eye size={16} />
              </td>
            </tr>

            <tr className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">#PC-2093</td>
              <td className="p-3">Marcus</td>
              <td className="p-3">$56</td>
              <td className="p-3 text-yellow-600">Processing</td>
              <td className="p-3">
                <Eye size={16} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
