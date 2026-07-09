import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Mail, Phone, Calendar, Coffee,
  MessageCircle, Star, Tag, Receipt,
} from "lucide-react";
import { membersAPI } from "../services/membersAPI";
import { ordersAPI } from "../services/ordersAPI";

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const all = await membersAPI.getAll();
        const found = all.find((m) => m.id === id);
        setMember(found || null);

        // Setelah member ditemukan, fetch riwayat pesanan by nomor HP
        if (found?.phone) {
          setOrdersLoading(true);
          const memberOrders = await ordersAPI.getByPhone(found.phone);
          setOrders(memberOrders);
          setOrdersLoading(false);
        }
      } catch {
        setMember(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  const statusStyle = (status) => {
    if (status === "Lunas") return "bg-[#B6D76D] text-[#00403C]";
    if (status === "Pending") return "bg-[#C0FCF8] text-[#00AAA6]";
    return "bg-red-100 text-red-500";
  };

  const totalSpend = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);

  if (loading) {
    return (
      <div className="p-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="p-20 text-center">
        <p className="text-gray-400">Member tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#00AAA6] font-bold text-sm">
          ← Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="p-[20px] bg-[#F5F5F5] min-h-full space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#00AAA6] font-bold text-sm hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft size={18} /> Kembali ke Daftar Member
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Kolom Kiri: Profil */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="h-24 bg-[#00403C]" />
            <div className="px-6 pb-6">
              <div className="relative flex justify-center">
                <div className="absolute -top-12 w-24 h-24 rounded-2xl bg-[#B6D76D] border-4 border-white flex items-center justify-center text-[#00403C] text-3xl font-black shadow-lg">
                  {member.name?.charAt(0)}
                </div>
              </div>
              <div className="mt-14 text-center">
                <h3 className="text-xl font-bold text-[#00403C] font-['Poppins']">{member.name}</h3>
                <span className={`mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  member.status === "Platinum" ? "bg-[#00403C] text-[#C0FCF8]"
                  : member.status === "Gold" ? "bg-[#B6D76D] text-[#00403C]"
                  : "bg-gray-100 text-gray-500"
                }`}>
                  {member.status} Member
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-sm text-[#525252]">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#00AAA6]"><Mail size={16} /></div>
                  <span className="truncate">{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-4 text-sm text-[#525252]">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#00AAA6]"><Phone size={16} /></div>
                    {member.phone}
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm text-[#525252]">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#00AAA6]"><Calendar size={16} /></div>
                  Joined: {new Date(member.joined_at).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </div>
                {member.tag && (
                  <div className="flex items-center gap-4 text-sm text-[#525252]">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#00AAA6]"><Tag size={16} /></div>
                    {member.tag}
                  </div>
                )}
              </div>

              <a
                href={`https://wa.me/${member.phone?.replace(/^0/, "62").replace(/\s/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-8 bg-[#00403C] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#00302d]"
              >
                <MessageCircle size={18} /> Kirim WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Stats + Riwayat */}
        <div className="lg:col-span-2 space-y-6">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Poin</p>
              <div className="flex items-end gap-1 mt-2">
                <h4 className="text-2xl font-bold text-[#00403C]">{(member.points || 0).toLocaleString()}</h4>
                <p className="text-xs font-bold text-[#00AAA6] pb-0.5">pts</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kunjungan</p>
              <div className="flex items-end gap-1 mt-2">
                <h4 className="text-2xl font-bold text-[#00403C]">{member.visits || 0}</h4>
                <p className="text-xs font-bold text-[#00AAA6] pb-0.5">x</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Spend</p>
              <div className="flex items-end gap-1 mt-2">
                <h4 className="text-xl font-bold text-[#00403C]">
                  {totalSpend > 0 ? `Rp ${(totalSpend / 1000).toFixed(0)}k` : "—"}
                </h4>
              </div>
            </div>
          </div>

          {/* Riwayat Transaksi */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-bold text-[#00403C] font-['Poppins'] mb-5 flex items-center gap-2">
              <Receipt size={20} className="text-[#00AAA6]" />
              Riwayat Transaksi
              {orders.length > 0 && (
                <span className="ml-auto text-[11px] font-bold text-[#00AAA6] bg-[#F0FAF9] px-2 py-0.5 rounded-full">
                  {orders.length} transaksi
                </span>
              )}
            </h4>

            {!member.phone ? (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-400">Nomor HP belum diisi.</p>
                <p className="text-xs text-gray-300 mt-1">Tambahkan nomor HP member untuk melacak riwayat pesanan.</p>
              </div>
            ) : ordersLoading ? (
              <div className="py-8 flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <div className="py-8 text-center">
                <Coffee size={32} className="text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Belum ada pesanan tercatat.</p>
                <p className="text-xs text-gray-300 mt-1">Pesanan akan muncul saat nomor HP digunakan saat order.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id}
                    className="flex justify-between items-center p-4 border border-gray-50 rounded-xl hover:bg-[#F0FAF9]/50 transition-colors">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-[#F0FAF9] rounded-lg flex items-center justify-center text-[#00AAA6] flex-shrink-0">
                        <Coffee size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#525252]">{order.items}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {order.order_number} · {new Date(order.created_at).toLocaleDateString("id-ID", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                          {order.table_number && ` · ${order.table_number}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-[#00403C]">
                        Rp {order.total_price?.toLocaleString("id-ID")}
                      </p>
                      <div className="flex items-center gap-1.5 justify-end mt-0.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${statusStyle(order.status)}`}>
                          {order.status}
                        </span>
                        {order.points_earned > 0 && (
                          <span className="text-[10px] font-bold text-[#00AAA6]">+{order.points_earned} pts</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
