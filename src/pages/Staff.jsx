import { UserPlus, Mail } from "lucide-react";

export default function Staff() {
  const staff = [
    { name: "Alex Rivera", role: "Manager", email: "alex@cafe.com", img: "AR" },
    { name: "Sarah Chen", role: "Barista", email: "sarah@cafe.com", img: "SC" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <UserPlus size={18} /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((person, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border text-center"
          >
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              {person.img}
            </div>
            <h3 className="font-semibold">{person.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{person.role}</p>
            <button className="w-full border py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
              <Mail size={14} /> Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
