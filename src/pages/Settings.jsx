import { Bell, Lock, User, Globe } from "lucide-react";

export default function Settings() {
  const sections = [
    { icon: User, title: "Profile", desc: "Manage your personal information" },
    {
      icon: Bell,
      title: "Notifications",
      desc: "Configure how you receive alerts",
    },
    { icon: Lock, title: "Security", desc: "Update password and 2FA settings" },
    {
      icon: Globe,
      title: "Regional",
      desc: "Language and currency preferences",
    },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="bg-white rounded-xl shadow border divide-y">
        {sections.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{s.title}</h4>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </div>
              <span className="text-gray-300">→</span>
            </div>
          );
        })}
      </div>

      <div className="pt-4">
        <button className="text-red-500 font-medium text-sm hover:underline">
          Sign out from all devices
        </button>
      </div>
    </div>
  );
}
