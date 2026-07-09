import React, { useState, useEffect } from "react";
import { Users, UserPlus, Star, Download, X, Check, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { membersAPI } from "../services/membersAPI";
import Button from "../components/Button";
import MemberTable from "../components/MemberTable";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  points: 0,
  status: "Silver",
  visits: 0,
  tag: "Member Baru",
};

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null); // null = tambah baru
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await membersAPI.getAll();
      setMembers(data);
    } catch {
      setError("Gagal memuat data member.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(
    (m) =>
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgPoints =
    members.length > 0
      ? Math.round(members.reduce((sum, m) => sum + (m.points || 0), 0) / members.length)
      : 0;

  // --- Modal helpers ---
  const openAddModal = () => {
    setEditingMember(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone || "",
      points: member.points || 0,
      status: member.status || "Silver",
      visits: member.visits || 0,
      tag: member.tag || "Member Reguler",
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
    if (!form.name || !form.email) {
      setFormError("Nama dan email wajib diisi.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      if (editingMember) {
        await membersAPI.update(editingMember.id, form);
      } else {
        await membersAPI.create(form);
      }
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      setFormError(err.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Yakin ingin menghapus member ini?")) return;
    try {
      await membersAPI.delete(id);
      fetchMembers();
    } catch {
      alert("Gagal menghapus member.");
    }
  };

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Database Member
          </h2>
          <p className="text-sm text-[#737373]">
            Mengelola {members.length} total pelanggan setia Papi Coffee.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Download size={18} className="text-[#00AAA6]" /> Export CSV
          </Button>
          <Button onClick={openAddModal}>
            <UserPlus size={18} /> Tambah Member
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-full flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Members</p>
            <p className="text-xl font-bold text-[#00403C]">{loading ? "..." : `${members.length} Pelanggan`}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#FFF7ED] text-[#F97316] rounded-full flex items-center justify-center">
            <Star size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Avg. Points</p>
            <p className="text-xl font-bold text-[#00403C]">{loading ? "..." : `${avgPoints.toLocaleString()} pts`}</p>
          </div>
        </div>
        <div className="bg-[#B6D76D] p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#00403C] text-white rounded-full flex items-center justify-center">
            <UserPlus size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#00403C]/60 uppercase tracking-wider">Growth</p>
            <p className="text-xl font-bold text-[#00403C]">+12.5%</p>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 flex items-center justify-center shadow-sm">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[#737373]">Memuat data member...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl p-12 flex items-center justify-center shadow-sm">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : (
        <MemberTable
          members={filteredMembers}
          totalMembers={members.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRowClick={(id) => navigate(`/app/members/${id}`)}
          onEdit={(member, e) => { e.stopPropagation(); openEditModal(member); }}
          onDelete={handleDelete}
        />
      )}

      {/* Modal Tambah / Edit Member */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#00403C] font-['Poppins']">
                  {editingMember ? "Edit Member" : "Tambah Member Baru"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editingMember ? "Update data pelanggan." : "Isi data untuk mendaftarkan member baru."}
                </p>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-2.5 rounded-lg">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Nama Lengkap", key: "name", type: "text", placeholder: "Nama pelanggan..." },
                { label: "Email", key: "email", type: "email", placeholder: "email@contoh.com" },
                { label: "No. WhatsApp", key: "phone", type: "text", placeholder: "08xxxxxxxxxx" },
                { label: "Points", key: "points", type: "number", placeholder: "0" },
                { label: "Total Kunjungan", key: "visits", type: "number", placeholder: "0" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                  />
                </div>
              ))}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Tier</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] bg-white"
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tag</label>
                <select
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] bg-white"
                >
                  <option value="Member Baru">Member Baru</option>
                  <option value="Member Reguler">Member Reguler</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              <div className="flex gap-2 pt-1">
                <button type="button" onClick={closeModal}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#00AAA6] hover:bg-[#008f8c] rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                  ) : (
                    <><Check size={16} /> {editingMember ? "Simpan Perubahan" : "Tambah Member"}</>
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
