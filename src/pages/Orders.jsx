import React, { useState, useEffect, useRef } from "react";
import {
  Plus, X, Check, Trash2, Pencil, Coffee,
  Clock, Search, CheckCircle2, Phone, User,
} from "lucide-react";
import { ordersAPI } from "../services/ordersAPI";
import { membersAPI } from "../services/membersAPI";
import MenuPicker from "../components/MenuPicker";

const STATUS_OPTIONS = ["Lunas", "Pending", "Dibatalkan"];

const EMPTY_FORM = {
  order_number: "",
  member_phone: "",
  member_name: "",
  member_id: null,
  selectedMenuItems: [], // array [{name, price, qty}]
  items: "", // akan di-generate otomatis dari selectedMenuItems
  total_price: 0,
  status: "Lunas",
  table_number: "",
  points_earned: 0,
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [toast, setToast] = useState(null);

  // State untuk lookup member by HP
  const [phoneQuery, setPhoneQuery] = useState("");
  const [phoneSuggestions, setPhoneSuggestions] = useState([]);
  const [foundMember, setFoundMember] = useState(null); // member yang terdeteksi
  const phoneDebounce = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersAPI.getAll();
      setOrders(data);
    } catch {
      setError("Gagal memuat data pesanan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Load semua member untuk lookup
    membersAPI.getAll().then(setMembers).catch(() => {});
  }, []);

  // Auto-lookup member saat nomor HP diketik
  const handlePhoneChange = (value) => {
    setPhoneQuery(value);
    setFoundMember(null);
    setForm((f) => ({ ...f, member_phone: value, member_name: "", member_id: null }));

    clearTimeout(phoneDebounce.current);
    if (value.length < 4) {
      setPhoneSuggestions([]);
      return;
    }

    phoneDebounce.current = setTimeout(() => {
      const matches = members.filter((m) =>
        m.phone?.replace(/\s/g, "").includes(value.replace(/\s/g, ""))
      );
      setPhoneSuggestions(matches.slice(0, 5));
    }, 300);
  };

  const selectMember = (member) => {
    setPhoneQuery(member.phone);
    setFoundMember(member);
    setPhoneSuggestions([]);
    setForm((f) => ({
      ...f,
      member_phone: member.phone,
      member_name: member.name,
      member_id: member.id,
    }));
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.member_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.member_phone?.includes(searchTerm) ||
      o.items?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate nomor order berikutnya otomatis
  const generateOrderNumber = (existingOrders) => {
    if (!existingOrders || existingOrders.length === 0) return "#1001";
    const numbers = existingOrders
      .map((o) => parseInt(o.order_number?.replace(/\D/g, "") || "0"))
      .filter((n) => !isNaN(n));
    const max = Math.max(...numbers, 1000);
    return `#${max + 1}`;
  };

  const openAddModal = () => {
    setEditingOrder(null);
    setForm({ ...EMPTY_FORM, order_number: generateOrderNumber(orders) });
    setPhoneQuery("");
    setFoundMember(null);
    setPhoneSuggestions([]);
    setFormError(null);
    setShowModal(true);
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setPhoneQuery(order.member_phone || "");
    setFoundMember(null);
    setPhoneSuggestions([]);
    setForm({
      order_number: order.order_number,
      member_phone: order.member_phone || "",
      member_name: order.member_name || "",
      member_id: order.member_id || null,
      selectedMenuItems: [], // tidak parse balik, tapi bisa edit manual
      items: order.items,
      total_price: order.total_price,
      status: order.status,
      table_number: order.table_number || "",
      points_earned: order.points_earned || 0,
    });
    setFormError(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError(null);
    setPhoneSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Auto-generate items dan total_price dari selectedMenuItems
    let finalItems = form.items;
    let finalPrice = form.total_price;

    if (form.selectedMenuItems && form.selectedMenuItems.length > 0) {
      finalItems = form.selectedMenuItems
        .map((item) => `${item.qty}x ${item.name}`)
        .join(", ");
      finalPrice = form.selectedMenuItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
    }

    if (!form.order_number || !finalItems) {
      setFormError("Nomor order dan item wajib diisi.");
      return;
    }

    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        ...form,
        items: finalItems,
        total_price: finalPrice,
      };
      delete payload.selectedMenuItems; // tidak perlu disimpan ke DB

      if (editingOrder) {
        await ordersAPI.update(editingOrder.id, payload);
        showToast("Pesanan berhasil diupdate.");
      } else {
        await ordersAPI.create(payload);
        showToast("Pesanan ditambahkan & otomatis masuk antrian dapur.");
      }
      setShowModal(false);
      fetchOrders();
    } catch (err) {
      setFormError(err.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pesanan ini?")) return;
    try {
      await ordersAPI.delete(id);
      fetchOrders();
    } catch {
      alert("Gagal menghapus pesanan.");
    }
  };

  const statusStyle = (status) => {
    if (status === "Lunas") return "bg-[#B6D76D] text-[#00403C]";
    if (status === "Pending") return "bg-[#C0FCF8] text-[#00AAA6]";
    return "bg-red-100 text-red-500";
  };

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold
          ${toast.type === "success" ? "bg-[#00403C] text-white" : "bg-red-500 text-white"}`}>
          <CheckCircle2 size={18} />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold font-['Poppins'] text-[#00403C]">Riwayat Pesanan</h2>
          <p className="text-xs text-gray-400">Kelola dan pantau semua transaksi masuk pelanggan</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d]"
        >
          <Plus size={18} /> Tambah Pesanan
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari order, nama, HP, atau item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 flex items-center justify-center shadow-sm">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[#737373]">Memuat data pesanan...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl p-12 flex items-center justify-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400 bg-white rounded-xl border border-gray-100">
              Pesanan tidak ditemukan
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id}
                className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-[#C0FCF8] rounded-lg flex items-center justify-center text-[#00AAA6]">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#00403C]">{order.order_number}</p>
                    {order.member_name ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-semibold text-[#00AAA6]">{order.member_name}</span>
                        {order.member_phone && (
                          <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                            <Phone size={9} /> {order.member_phone}
                          </span>
                        )}
                      </div>
                    ) : order.member_phone ? (
                      <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <Phone size={10} /> {order.member_phone}
                      </p>
                    ) : null}
                    <p className="text-xs text-[#737373] font-medium mt-0.5">{order.items}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                      {order.table_number && ` · ${order.table_number}`}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div>
                    <p className="font-bold text-[#00403C] text-lg">
                      Rp {order.total_price?.toLocaleString("id-ID")}
                    </p>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyle(order.status)}`}>
                      {order.status}
                    </span>
                    {order.points_earned > 0 && (
                      <p className="text-[10px] text-[#00AAA6] font-bold mt-0.5">+{order.points_earned} pts</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEditModal(order)}
                      className="p-1.5 rounded-lg bg-[#00AAA6]/10 text-[#00AAA6] hover:bg-[#00AAA6]/20 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(order.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#00403C] font-['Poppins']">
                  {editingOrder ? "Edit Pesanan" : "Tambah Pesanan Baru"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Isi detail transaksi pesanan.</p>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-2.5 rounded-lg">{formError}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Nomor Order */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nomor Order
                  <span className="ml-1 text-[#00AAA6] normal-case font-normal">· otomatis</span>
                </label>
                <input type="text" placeholder="#1001"
                  value={form.order_number}
                  onChange={(e) => setForm({ ...form, order_number: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-[#00AAA6]/30 bg-[#F0FAF9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] font-bold text-[#00403C]"
                />
              </div>

              {/* Nomor HP — dengan autocomplete member */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nomor HP Member <span className="text-gray-300 font-normal normal-case">(opsional)</span>
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="08xxxxxxxxxx"
                    value={phoneQuery}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                    autoComplete="off"
                  />
                  {/* Dropdown suggestions */}
                  {phoneSuggestions.length > 0 && (
                    <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {phoneSuggestions.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => selectMember(m)}
                          className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F0FAF9] transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#00403C] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {m.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#00403C]">{m.name}</p>
                            <p className="text-[11px] text-gray-400">{m.phone}</p>
                          </div>
                          <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            m.status === "Platinum" ? "bg-[#00403C] text-[#C0FCF8]"
                            : m.status === "Gold" ? "bg-[#B6D76D] text-[#00403C]"
                            : "bg-gray-100 text-gray-500"
                          }`}>{m.status}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Badge member yang terdeteksi */}
                {foundMember && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#F0FAF9] border border-[#00AAA6]/20 rounded-lg">
                    <User size={14} className="text-[#00AAA6]" />
                    <p className="text-xs font-semibold text-[#00403C]">{foundMember.name}</p>
                    <span className="text-[10px] text-[#00AAA6]">· {foundMember.points?.toLocaleString()} pts</span>
                    <button type="button" onClick={() => {
                      setFoundMember(null);
                      setPhoneQuery("");
                      setForm((f) => ({ ...f, member_phone: "", member_name: "", member_id: null }));
                    }} className="ml-auto text-gray-400 hover:text-red-400">
                      <X size={13} />
                    </button>
                  </div>
                )}
              </div>

              {/* Item Pesanan — Menu Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Item Pesanan
                </label>
                {!editingOrder ? (
                  <MenuPicker
                    selectedItems={form.selectedMenuItems || []}
                    onChange={(items) => {
                      const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
                      setForm((f) => ({
                        ...f,
                        selectedMenuItems: items,
                        total_price: total,
                        points_earned: Math.floor(total / 5000), // 1 poin per Rp5.000
                      }));
                    }}
                  />
                ) : (
                  // Saat edit — tampilkan text input biasa
                  <input type="text" placeholder="Aren Latte, Croissant..."
                    value={form.items}
                    onChange={(e) => setForm({ ...form, items: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                  />
                )}
              </div>

              {/* Total Harga & Meja */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Harga (Rp)
                    {!editingOrder && form.selectedMenuItems?.length > 0 && (
                      <span className="ml-1 text-[#00AAA6] normal-case font-normal">· auto</span>
                    )}
                  </label>
                  <input type="number" placeholder="65000"
                    value={form.total_price}
                    onChange={(e) => setForm({ ...form, total_price: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nomor Meja</label>
                  <input type="text" placeholder="T-04 / Takeaway"
                    value={form.table_number}
                    onChange={(e) => setForm({ ...form, table_number: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                  />
                </div>
              </div>

              {/* Poin & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Poin Didapat</label>
                  <input type="number" placeholder="0"
                    value={form.points_earned}
                    onChange={(e) => setForm({ ...form, points_earned: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</label>
                  <select value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] bg-white">
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button type="button" onClick={closeModal}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#00AAA6] hover:bg-[#008f8c] rounded-lg disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                  ) : (
                    <><Check size={16} /> {editingOrder ? "Simpan Perubahan" : "Tambah Pesanan"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
