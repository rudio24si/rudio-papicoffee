import { TrendingUp, Users, Clock } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Business Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" /> Sales Performance
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-between p-4 gap-2">
            {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-full bg-blue-400 rounded-t-md opacity-80 hover:opacity-100 transition-all"
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <Users />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Customers</p>
              <h4 className="text-2xl font-bold">1,240</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
              <Clock />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Service Time</p>
              <h4 className="text-2xl font-bold">4.5 min</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
