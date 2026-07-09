import React, { useState, useEffect } from "react";
import { Search, Ticket, X, Check, Trash2, Pencil } from "lucide-react";
import { loyaltyAPI } from "../services/loyaltyAPI";
import LoyaltyOverview from "../components/LoyaltyOverview";
import RecentRedemptions from "../components/RecentRedemptions";

const CATEGORIES = ["Beverage", "Pastry", "Voucher", "Beans", "Merchandise"];

const EMPTY_FORM = {
  title: "",
  points_required: 0,
  stock: 0,
  category: "Beverage",
  is_active: true,
};

export default function Loyalty() {
  const [rewards, setRewards] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rwds, redmps] = await Promise.all([
        loyaltyAPI.getAllRewards(),
        loyaltyAPI.getAllRedemptions(),
      ]);
      setRewards(rwds);
      setRedemptions(redmps);
    } catch {
      // silently fail — UI shows empty state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRewards = rewards.filter(
    (r) =>
      r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPoints = redemptions.reduce((sum, r) => sum + (r.points_used || 0), 0);
  const topItem = redemptions.length > 0 ? redemptions[0].reward_title : "-";

  const openAddModal = () => {
    setEditingReward(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowModal(true);
  };

  const openEditModal = (reward) => {
    setEditingReward(reward);
    setForm({
      title: reward.title,
      points_required: reward.points_required,
      stock: reward.stock,
      category: reward.category || "Beverage",
      is_active: reward.is_active ?? true,
    });
    setFormError(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      setFormError("Nama reward wajib diisi.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      if (editingReward) {
        await loyaltyAPI.updateReward(editingReward.id, form);
      } else {
        await loyaltyAPI.createReward(form);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      setFormError(err.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus reward ini?")) return;
    try {
      await loyaltyAPI.deleteReward(id);
      fetchData();
    } catch {
      alert("Gagal menghapus reward.");
    }
  };

  const categoryColor = (cat) => {
    const map = {
      Beverage: "bg-[#C0FCF8] text-[#00AAA6]",
      Pastry: "bg-[#FFF7ED] text-[#F97316]",
      Voucher: "bg-[#F0FAF9] text-[#00403C]",
      Beans: "bg-[#B6D76D]/30 text-[#00403C]",
      Merchandise: "bg-gray-100 text-gray-500",
    };
    return map[cat] || "bg-gray-100 text-gray-500";
  };

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">Loyalty Program</h2>
          <p className="text-sm text-[#737373]">Kelola poin pelanggan dan pengaturan hadiah penukaran.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d] transition-all"
        >
          <Ticket size={18} /> Buat Reward Baru
        </button>
      </div>

      {/* Overview */}
      <LoyaltyOverview
        points={totalPoints}
        rate={redemptions.length > 0 ? 68 : 0}
        totalItems={rewards.length}
        topItem={topItem}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Katalog Hadiah */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-[#00403C] font-['Poppins']">Katalog Hadiah Aktif</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Cari reward..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs outline-none focus:border-[#00AAA6]"
              />
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl p-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRewards.length === 0 ? (
                <div className="col-span-2 text-center py-10 bg-white rounded-xl text-sm text-gray-400 border border-gray-100">
                  Belum ada reward. Tambahkan reward baru.
                </div>
              ) : (
                filteredRewards.map((reward) => (
                  <div key={reward.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${categoryColor(reward.category)}`}>
                        {reward.category}
                      </span>
                      <div className="flex gap-1">
                        <button onClick={() => openEditModal(reward)}
                          className="p-1.5 rounded-lg bg-[#00AAA6]/10 text-[#00AAA6] hover:bg-[#00AAA6]/20 transition-colors">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => handleDelete(reward.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-[#00403C] text-sm">{reward.title}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-lg font-black text-[#00AAA6]">
                        {reward.points_required?.toLocaleString()} pts
                      </p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${reward.stock > 0 ? "bg-[#B6D76D]/30 text-[#00403C]" : "bg-red-50 text-red-400"}`}>
                        Stok: {reward.stock}
                      </span>
                    </div>
                    {!reward.is_active && (
                      <p className="mt-2 text-[10px] text-red-400 font-bold uppercase">Non-aktif</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Aktivitas Penukaran */}
        <RecentRedemptions
          logs={redemptions.slice(0, 5).map((r) => ({
            user: r.member_name,
            item: r.reward_title,
            category: "",
            time: new Date(r.redeemed_at).toLocaleDateString("id-ID"),
          }))}
          onViewAll={() => {}}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#00403C] font-['Poppins']">
                  {editingReward ? "Edit Reward" : "Buat Reward Baru"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Isi detail katalog hadiah.</p>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-2.5 rounded-lg">{formError}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Reward</label>
                <input type="text" placeholder="Gratis 1 Aren Latte..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Poin Dibutuhkan</label>
                <input type="number" placeholder="500"
                  value={form.points_required}
                  onChange={(e) => setForm({ ...form, points_required: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Stok</label>
                <input type="number" placeholder="10"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</label>
                <select value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] bg-white">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_active" checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="w-4 h-4 accent-[#00AAA6]"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-[#525252]">Reward Aktif</label>
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
                    <><Check size={16} /> {editingReward ? "Simpan Perubahan" : "Buat Reward"}</>
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
