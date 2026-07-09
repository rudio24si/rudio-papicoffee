import React, { useState, useEffect } from "react";
import {
  Clock, CheckCircle2, Play, Timer, Coffee,
  MoreVertical, AlertCircle, Plus, X, Check, Trash2,
} from "lucide-react";
import { queueAPI } from "../services/queueAPI";

const EMPTY_FORM = {
  order_number: "",
  items: "",
  table_number: "",
  priority: "Normal",
  status: "In Progress",
  pickup_code: "",
};

export default function Queue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const data = await queueAPI.getAll();
      setQueue(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 30000);
    return () => clearInterval(interval);
  }, []);

  const inProgress = queue.filter((q) => q.status === "In Progress");
  const ready = queue.filter((q) => q.status === "Ready");

  const handleMarkReady = async (id) => {
    // Optimistic update — pindahkan kartu langsung tanpa tunggu server
    setQueue((prev) =>
      prev.map((q) => q.id === id ? { ...q, status: "Ready" } : q)
    );
    try {
      await queueAPI.updateStatus(id, "Ready");
    } catch (err) {
      console.error("PATCH queue error:", err.response?.status, err.response?.data);
      // Rollback kalau gagal
      fetchQueue();
    }
  };

  const handleMarkCompleted = async (id) => {
    // Optimistic update — langsung hilangkan dari list
    setQueue((prev) => prev.filter((q) => q.id !== id));
    try {
      await queueAPI.updateStatus(id, "Completed");
    } catch {
      alert("Gagal mengupdate status. Coba lagi.");
      fetchQueue();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus dari antrian?")) return;
    // Optimistic update
    setQueue((prev) => prev.filter((q) => q.id !== id));
    try {
      await queueAPI.delete(id);
    } catch {
      alert("Gagal menghapus.");
      fetchQueue();
    }
  };

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.order_number || !form.items) {
      setFormError("Nomor order dan item wajib diisi.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      await queueAPI.create(form);
      setShowModal(false);
      fetchQueue();
    } catch (err) {
      setFormError(err.response?.data?.message || "Gagal menambahkan antrian.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">Antrian Pesanan</h2>
          <p className="text-sm text-[#737373]">Pantau kecepatan servis dan status pesanan pelanggan.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#00AAA6] rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-[#00403C]">
                ANTRIAN: {inProgress.length + ready.length}
              </span>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d]"
          >
            <Plus size={16} /> Tambah Antrian
          </button>
        </div>
      </div>

      {loading && queue.length === 0 ? (
        <div className="bg-white rounded-xl p-12 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* In Progress */}
          <div className="space-y-4">
            <div className="flex items-center px-1">
              <h3 className="font-bold font-['Poppins'] text-[#00403C] flex items-center gap-2">
                <Timer size={20} className="text-[#F97316]" /> Sedang Disiapkan
                <span className="ml-2 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">{inProgress.length}</span>
              </h3>
            </div>

            <div className="space-y-3">
              {inProgress.length === 0 && (
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl text-center">
                  <p className="text-sm text-gray-400">Tidak ada pesanan yang sedang disiapkan.</p>
                </div>
              )}
              {inProgress.map((order) => (
                <div key={order.id}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                  {order.priority === "High" && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                  )}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-lg flex items-center justify-center">
                        <Coffee size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#00403C]">{order.order_number}</p>
                          {order.table_number && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-500">
                              {order.table_number}
                            </span>
                          )}
                          {order.priority === "High" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 rounded text-red-400">HIGH</span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-[#525252] mt-1">{order.items}</p>
                        <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                          <Clock size={10} /> {new Date(order.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => handleDelete(order.id)}
                        className="p-1 text-gray-300 hover:text-red-400 transition-colors">
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => handleMarkReady(order.id)}
                        className="bg-[#B6D76D] text-[#00403C] text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-[#a5c55d] transition-colors"
                      >
                        SELESAI
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ready for Pickup */}
          <div className="space-y-4">
            <div className="flex items-center px-1">
              <h3 className="font-bold font-['Poppins'] text-[#00403C] flex items-center gap-2">
                <CheckCircle2 size={20} className="text-[#00AAA6]" /> Siap Diambil
                <span className="ml-2 bg-[#C0FCF8] text-[#00AAA6] text-[10px] px-2 py-0.5 rounded-full">{ready.length}</span>
              </h3>
            </div>

            <div className="space-y-3">
              {ready.map((order) => (
                <div key={order.id}
                  className="bg-[#00403C] p-4 rounded-xl shadow-lg shadow-[#00403c]/10 relative overflow-hidden border border-[#00403c]">
                  <div className="absolute right-[-10px] top-[-10px] opacity-10 text-white">
                    <CheckCircle2 size={80} />
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-[#B6D76D] text-[#00403C] rounded-full flex items-center justify-center font-black text-xl">
                        {order.pickup_code || "–"}
                      </div>
                      <div>
                        <p className="font-bold text-white uppercase text-xs tracking-widest opacity-70">{order.order_number}</p>
                        <p className="font-bold text-[#C0FCF8] text-lg">{order.table_number || "Takeaway"}</p>
                        <p className="text-[11px] text-[#B6D76D] font-medium mt-1">{order.items}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleMarkCompleted(order.id)}
                        className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-4 py-2 rounded-lg border border-white/20 transition-colors uppercase tracking-wider"
                      >
                        Sudah Diambil
                      </button>
                      <button onClick={() => handleDelete(order.id)}
                        className="text-white/40 hover:text-red-300 text-[10px] font-bold text-center transition-colors">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center">
                <AlertCircle size={32} className="text-gray-300 mb-2" />
                <p className="text-[11px] font-medium text-gray-400">
                  Pesanan yang sudah diambil akan otomatis pindah ke Riwayat.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Antrian */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#00403C] font-['Poppins']">Tambah ke Antrian</h3>
                <p className="text-xs text-gray-400 mt-0.5">Masukkan detail pesanan baru ke antrian dapur.</p>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-2.5 rounded-lg">{formError}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Nomor Order", key: "order_number", type: "text", placeholder: "#1025" },
                { label: "Item Pesanan", key: "items", type: "text", placeholder: "2x Aren Latte, 1x Croissant..." },
                { label: "Nomor Meja", key: "table_number", type: "text", placeholder: "T-04 / Takeaway" },
                { label: "Kode Ambil", key: "pickup_code", type: "text", placeholder: "A1 (opsional)" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <input type={type} placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                  />
                </div>
              ))}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prioritas</label>
                <select value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] bg-white">
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
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
                    <><Check size={16} /> Tambah Antrian</>
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
