import React from "react";
import {
  User,
  Store,
  Bell,
  Lock,
  CreditCard,
  ChevronRight,
  Globe,
  ShieldCheck,
  Save,
} from "lucide-react";

export default function Settings() {
  const settingOptions = [
    {
      icon: <Store size={20} />,
      title: "Profil Toko",
      desc: "Nama kedai, alamat, dan kontak operasional.",
      active: true,
    },
    {
      icon: <User size={20} />,
      title: "Akun Pengguna",
      desc: "Kelola informasi pribadi dan foto profil.",
    },
    {
      icon: <Bell size={20} />,
      title: "Notifikasi",
      desc: "Atur pemberitahuan pesanan dan laporan harian.",
    },
    {
      icon: <Lock size={20} />,
      title: "Keamanan",
      desc: "Ubah kata sandi dan autentikasi dua faktor.",
    },
    {
      icon: <CreditCard size={20} />,
      title: "Metode Pembayaran",
      desc: "Atur QRIS, integrasi bank, dan e-wallet.",
    },
    {
      icon: <Globe size={20} />,
      title: "Bahasa & Wilayah",
      desc: "Pengaturan zona waktu dan bahasa aplikasi.",
    },
  ];

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Pengaturan
          </h2>
          <p className="text-sm text-[#737373]">
            Konfigurasi sistem dan preferensi akun Anda.
          </p>
        </div>
        <button className="bg-[#00403C] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d] transition-all shadow-sm">
          <Save size={18} /> Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Settings Menu */}
        <div className="lg:col-span-1 space-y-2">
          {settingOptions.map((opt, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all
                ${
                  opt.active
                    ? "bg-white border-[#00AAA6] shadow-sm"
                    : "bg-transparent border-transparent hover:bg-white hover:border-gray-200 text-gray-500"
                }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${opt.active ? "text-[#00AAA6]" : "text-gray-400"}`}
                >
                  {opt.icon}
                </div>
                <div>
                  <p
                    className={`text-sm font-bold ${opt.active ? "text-[#00403C]" : "text-[#525252]"}`}
                  >
                    {opt.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</p>
                </div>
              </div>
              <ChevronRight
                size={16}
                className={opt.active ? "text-[#00AAA6]" : "text-gray-300"}
              />
            </div>
          ))}
        </div>

        {/* Settings Detail Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold font-['Poppins'] text-[#00403C] mb-6 flex items-center gap-2">
              <Store size={20} className="text-[#00AAA6]" /> Informasi Profil
              Toko
            </h3>

            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
                <div className="w-20 h-20 bg-[#C0FCF8] rounded-2xl flex items-center justify-center text-[#00AAA6]">
                  <Store size={40} />
                </div>
                <div>
                  <button className="bg-[#F0FAF9] text-[#00AAA6] px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#00AAA6] hover:text-white transition-all">
                    Ganti Logo
                  </button>
                  <p className="text-[10px] text-gray-400 mt-2">
                    Maksimal 2MB (JPG, PNG)
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">
                    Nama Kedai
                  </label>
                  <input
                    type="text"
                    defaultValue="Papi Coffee & Roastery"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#00AAA6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">
                    ID Merchant
                  </label>
                  <input
                    type="text"
                    defaultValue="PC-99201"
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-100 border border-gray-100 rounded-lg text-sm text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#00AAA6]"
                  >
                    Jl. Kopi Nikmat No. 12, Jakarta Selatan, DKI Jakarta 12150
                  </textarea>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <h4 className="text-sm font-bold text-[#00403C]">
                  Opsi Verifikasi
                </h4>
                <div className="flex items-center justify-between p-4 bg-[#F0FAF9] rounded-xl border border-[#C0FCF8]">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-[#00AAA6]" size={20} />
                    <div>
                      <p className="text-xs font-bold text-[#00403C]">
                        Status Akun Terverifikasi
                      </p>
                      <p className="text-[10px] text-[#00AAA6]">
                        Identitas kedai Anda telah divalidasi oleh sistem.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-[#00AAA6] text-white px-2 py-1 rounded">
                    AKTIF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
