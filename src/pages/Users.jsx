import React, { useState, useEffect } from "react";
import {
  Users as UsersIcon,
  UserPlus,
  ShieldCheck,
  Search,
  Trash2,
  Pencil,
  X,
  Check,
} from "lucide-react";
import { userAPI } from "../services/userAPI";
import Button from "../components/Button";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [addForm, setAddForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userAPI.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const adminCount = users.filter((u) => u.role === "admin").length;
  const staffCount = users.filter((u) => u.role !== "admin").length;

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditForm({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const handleEditSave = async (id) => {
    try {
      await userAPI.updateUser(id, editForm);
      setEditingId(null);
      fetchUsers();
    } catch {
      alert("Gagal mengupdate user.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;
    try {
      await userAPI.deleteUser(id);
      fetchUsers();
    } catch {
      alert("Gagal menghapus user.");
    }
  };

  const handleOpenModal = () => {
    setAddForm({ username: "", email: "", password: "", role: "staff" });
    setAddError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAddError(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!addForm.username || !addForm.email || !addForm.password) {
      setAddError("Semua field wajib diisi.");
      return;
    }
    setAddLoading(true);
    setAddError(null);
    try {
      await userAPI.registerUser(addForm);
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setAddError(err.message || "Gagal menambahkan user.");
    } finally {
      setAddLoading(false);
    }
  };

  const roleBadge = (role) => {
    const styles =
      role === "admin"
        ? "bg-[#F0FAF9] text-[#00AAA6] border border-[#00AAA6]/30"
        : "bg-[#FFF7ED] text-[#F97316] border border-[#F97316]/30";
    return (
      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles}`}
      >
        {role}
      </span>
    );
  };

  return (
    <div className="p-[20px] space-y-6 bg-[#F5F5F5] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-['Poppins'] text-[#00403C]">
            Manajemen Users
          </h2>
          <p className="text-sm text-[#737373]">
            Kelola akses dan data pengguna sistem Papi Coffee.
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#00AAA6] hover:bg-[#008f8c] rounded-lg transition-colors"
        >
          <UserPlus size={18} /> Tambah User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-full flex items-center justify-center">
            <UsersIcon size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Total Users
            </p>
            <p className="text-xl font-bold text-[#00403C]">
              {loading ? "..." : `${users.length} Users`}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#F0FAF9] text-[#00AAA6] rounded-full flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Admin
            </p>
            <p className="text-xl font-bold text-[#00403C]">
              {loading ? "..." : `${adminCount} Admin`}
            </p>
          </div>
        </div>

        <div className="bg-[#B6D76D] p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#00403C] text-white rounded-full flex items-center justify-center">
            <UserPlus size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#00403C]/60 uppercase tracking-wider">
              Staff
            </p>
            <p className="text-xl font-bold text-[#00403C]">
              {loading ? "..." : `${staffCount} Staff`}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 flex items-center justify-center shadow-sm">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#00AAA6] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[#737373]">Memuat data users...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl p-12 flex items-center justify-center shadow-sm">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari username, email, atau role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
              />
            </div>
            <p className="text-xs text-gray-400 ml-auto">
              Menampilkan {filteredUsers.length} dari {users.length} users
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F9FAFB] text-left">
                  {["#", "Username", "Email", "Password", "Role", "Aksi"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      Tidak ada user yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-[#F0FAF9]/40 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-gray-400 font-medium">
                        {index + 1}
                      </td>

                      <td className="px-5 py-3.5">
                        {editingId === user.id ? (
                          <input
                            className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30"
                            value={editForm.username}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                username: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span className="font-semibold text-[#00403C]">
                            {user.username}
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-gray-500">
                        {editingId === user.id ? (
                          <input
                            className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          user.email
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-gray-400 tracking-widest text-xs">
                        ••••••••
                      </td>

                      <td className="px-5 py-3.5">
                        {editingId === user.id ? (
                          <select
                            className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30"
                            value={editForm.role}
                            onChange={(e) =>
                              setEditForm({ ...editForm, role: e.target.value })
                            }
                          >
                            <option value="admin">admin</option>
                            <option value="staff">staff</option>
                          </select>
                        ) : (
                          roleBadge(user.role)
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          {editingId === user.id ? (
                            <>
                              <button
                                onClick={() => handleEditSave(user.id)}
                                className="p-1.5 rounded-lg bg-[#00AAA6]/10 text-[#00AAA6] hover:bg-[#00AAA6]/20 transition-colors"
                              >
                                <Check size={15} />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
                              >
                                <X size={15} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditClick(user)}
                                className="p-1.5 rounded-lg bg-[#00AAA6]/10 text-[#00AAA6] hover:bg-[#00AAA6]/20 transition-colors"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                              >
                                <Trash2 size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Tambah User */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#00403C] font-['Poppins']">
                  Tambah User Baru
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Isi data lengkap untuk menambahkan user.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error */}
            {addError && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-2.5 rounded-lg">
                {addError}
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Masukkan username..."
                  value={addForm.username}
                  onChange={(e) =>
                    setAddForm({ ...addForm, username: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan email..."
                  value={addForm.email}
                  onChange={(e) =>
                    setAddForm({ ...addForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Masukkan password..."
                  value={addForm.password}
                  onChange={(e) =>
                    setAddForm({ ...addForm, password: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
                />
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Role
                </label>
                <select
                  value={addForm.role}
                  onChange={(e) =>
                    setAddForm({ ...addForm, role: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6] bg-white"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddSubmit}
                disabled={addLoading}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#00AAA6] hover:bg-[#008f8c] rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {addLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Simpan User
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
