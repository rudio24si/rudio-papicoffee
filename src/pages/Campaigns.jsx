import React, { useState, useEffect } from "react";
import {
  Megaphone, Send, Mail, MessageSquare, Plus,
  Clock, CheckCircle2, BarChart3, Users, X, Check, Trash2, Pencil,
} from "lucide-react";
import { campaignsAPI } from "../services/campaignsAPI";

const CHANNELS = ["WhatsApp", "Email Blast", "App Notification"];
const SEGMENTS = ["All Members", "Champions", "At Risk", "New Members", "VIP"];
const STATUSES = ["Scheduled", "Running", "Completed"];

const EMPTY_FORM = {
  name: "",
  channel: "WhatsApp",
  target_segment: "All Members",
  status: "Scheduled",
  scheduled_date: "",
  message: "",
};

const channelIcon = (channel) => {
  if (channel === "WhatsApp") return <MessageSquare size={18} className="text-[#25D366]" />;
  if (channel === "Email Blast") return <Mail size={18} className="text-[#00AAA6]" />;
  return <Megaphone size={18} className="text-[#00403C]" />;
};

const statusStyle = (status) => {
  if (status === "Running") return "bg-[#B6D76D] text-[#00403C]";
  if (status === "Scheduled") return "bg-[#C0FCF8] text-[#00AAA6]";
  return "bg-gray-100 text-gray-400";
};

const channelBorderColor = (channel) => {
  if (channel === "WhatsApp") return "border-l-[#25D366]";
  if (channel === "Email Blast") return "border-l-[#00AAA6]";
  return "border-l-[#00403C]";
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Semua");

  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await campaignsAPI.getAll();
      setCampaigns(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((c) =>
    filter === "Semua" ? true : c.status === filter
  );

  const totalSent = campaigns.reduce((sum, c) => sum + (c.total_sent || 0), 0);
  const runningCount = campaigns.filter((c) => c.status === "Running").length;

  const openAddModal = () => {
    setEditingCampaign(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowModal(true);
  };

  const openEditModal = (campaign) => {
    setEditingCampaign(campaign);
    setForm({
      name: campaign.name,
      channel: campaign.channel,
      target_segment: campaign.target_segment,
      status: campaign.status,
      scheduled_date: campaign.scheduled_date || "",
      message: campaign.message || "",
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
    if (!form.name) {
      setFormError("Nama campaign wajib diisi.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      if (editingCampaign) {
        await campaignsAPI.update(editingCampaign.id, form);
      } else {
        await campaignsAPI.create(form);
      }
      setShowModal(false);
      fetchCampaigns();
    } catch (err) {
      setFormError(err.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus campaign ini?")) return;
    try {
      await campaignsAPI.delete(id);
      fetchCampaigns();
    } catch {
      alert("Gagal menghapus campaign.");
    }
  };

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">Marketing Campaigns</h2>
          <p className="text-sm text-[#737373]">Jangkau pelanggan Anda dengan promo dan pesan yang personal.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#00403C] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#00302d] shadow-sm"
        >
          <Plus size={18} /> Buat Campaign Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-xl flex items-center justify-center"><Send size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Sent</p>
            <p className="text-xl font-bold text-[#00403C]">{totalSent.toLocaleString()} Pesan</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#B6D76D]/20 text-[#00403C] rounded-xl flex items-center justify-center"><CheckCircle2 size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sedang Berjalan</p>
            <p className="text-xl font-bold text-[#00403C]">{runningCount} Campaign</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#C0FCF8] text-[#00AAA6] rounded-xl flex items-center justify-center"><BarChart3 size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Campaign</p>
            <p className="text-xl font-bold text-[#00403C]">{campaigns.length} Campaign</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold font-['Poppins'] text-[#00403C]">Daftar Campaign</h3>
            <div className="flex gap-2">
              {["Semua", "Running", "Scheduled", "Completed"].map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`text-xs font-bold px-3 py-1 rounded transition-colors ${filter === f ? "text-[#00AAA6] bg-[#F0FAF9]" : "text-gray-400 hover:bg-gray-50"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredCampaigns.length === 0 ? (
                <p className="p-8 text-center text-sm text-gray-400">Belum ada campaign.</p>
              ) : (
                filteredCampaigns.map((camp) => (
                  <div key={camp.id}
                    className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 ${channelBorderColor(camp.channel)}`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">{channelIcon(camp.channel)}</div>
                      <div>
                        <h4 className="font-bold text-[#525252] text-sm">{camp.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                          <span className="flex items-center gap-1"><Users size={12} /> {camp.target_segment}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {camp.scheduled_date || camp.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter ${statusStyle(camp.status)}`}>
                        {camp.status}
                      </span>
                      <button onClick={() => openEditModal(camp)}
                        className="p-1.5 rounded-lg bg-[#00AAA6]/10 text-[#00AAA6] hover:bg-[#00AAA6]/20 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(camp.id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* AI Campaign Card */}
        <div className="bg-[#00403C] rounded-xl p-6 text-white flex flex-col justify-between shadow-lg shadow-[#00403c]/20">
          <div>
            <div className="w-12 h-12 bg-[#00AAA6] rounded-xl flex items-center justify-center mb-6">
              <Megaphone size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold font-['Poppins'] mb-2">Campaign Pintar</h3>
            <p className="text-xs text-[#C0FCF8] leading-relaxed">
              Gunakan kecerdasan buatan untuk menentukan waktu terbaik mengirim
              promo ke pelanggan Anda berdasarkan riwayat kunjungan mereka.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#B6D76D] animate-pulse" />
              <p className="text-[11px] font-medium text-white/80">Waktu disarankan: 09:00 AM</p>
            </div>
            <button className="w-full bg-[#B6D76D] text-[#00403C] py-3 rounded-lg font-bold text-sm hover:scale-[1.02] transition-transform">
              Mulai Campaign AI
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#00403C] font-['Poppins']">
                  {editingCampaign ? "Edit Campaign" : "Buat Campaign Baru"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Isi detail campaign pemasaran.</p>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-2.5 rounded-lg">{formError}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Campaign</label>
                <input type="text" placeholder="Promo Weekend Seru..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                />
              </div>

              {[
                { label: "Channel", key: "channel", options: CHANNELS },
                { label: "Target Segmen", key: "target_segment", options: SEGMENTS },
                { label: "Status", key: "status", options: STATUSES },
              ].map(({ label, key, options }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <select value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] bg-white">
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Jadwal</label>
                <input type="date"
                  value={form.scheduled_date}
                  onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pesan</label>
                <textarea placeholder="Tulis pesan campaign..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] resize-none"
                />
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
                    <><Check size={16} /> {editingCampaign ? "Simpan Perubahan" : "Buat Campaign"}</>
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
