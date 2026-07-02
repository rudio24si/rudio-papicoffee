import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Coffee,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { userAPI } from "../services/userAPI";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loggedInUser = await userAPI.loginUser(
        formData.username,
        formData.password,
      );

      if (loggedInUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: loggedInUser.username,
            email: loggedInUser.email,
            role: loggedInUser.role,
          }),
        );

        setLoading(false);
        navigate("/app");
      } else {
        setError("Username atau Password salah!");
        setLoading(false);
        usernameRef.current.focus();
      }
    } catch (err) {
      setError(err.message || "Gagal terhubung ke server database.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F7F8F8] px-4 py-8 text-[#1A1A1A] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#0D3B33]/10 bg-white shadow-[0_30px_80px_rgba(13,59,51,0.12)]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0D3B33] p-10 text-white lg:flex lg:w-[46%]">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070"
            alt="coffee"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D3B33] via-[#0D3B33]/90 to-[#00403C]/75" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B8EDE3] text-[#0D3B33]">
                <Coffee size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Papi Coffee</p>
                <p className="text-xs text-[#B8EDE3]/80">CRM untuk coffee shop</p>
              </div>
            </div>

            <div className="mt-14 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#B8EDE3]/20 px-3 py-1 text-sm font-medium text-[#B8EDE3]">
                <Sparkles size={14} />
                Selamat datang kembali
              </div>
              <h2 className="text-3xl font-semibold leading-tight">
                Nikmati pengalaman yang lebih rapi untuk mengelola bisnis kopi Anda.
              </h2>
              <p className="max-w-md text-sm text-[#E5F5F3]">
                Masuk untuk melihat perkembangan usaha, pelanggan, dan aktivitas penting dalam satu tempat.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm text-[#EAF7F4]">
            <ShieldCheck size={16} />
            Akses aman untuk tim admin dan owner
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-[#F7F8F8] px-6 py-10 sm:px-8 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00AAA6]">
                Masuk
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-[#0D3B33]">
                Selamat datang kembali
              </h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                Masukkan kredensial untuk melanjutkan ke akun Anda
              </p>
            </div>

            {error && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#0D3B33]">
                  Username
                </label>
                <input
                  ref={usernameRef}
                  type="text"
                  name="username"
                  required
                  disabled={loading}
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  className="w-full rounded-2xl border border-[#DDE4E1] bg-white px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#00AAA6] focus:ring-2 focus:ring-[#00AAA6]/20 disabled:bg-[#F3F4F6]"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <label className="font-medium text-[#0D3B33]">Password</label>
                  <Link
                    to="/forgot"
                    className="text-[#00AAA6] transition hover:text-[#008f8c]"
                  >
                    Lupa?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    disabled={loading}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="w-full rounded-2xl border border-[#DDE4E1] bg-white px-4 py-3 pr-12 text-sm text-[#1A1A1A] outline-none transition focus:border-[#00AAA6] focus:ring-2 focus:ring-[#00AAA6]/20 disabled:bg-[#F3F4F6]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] transition hover:text-[#0D3B33]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B33] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#092926] disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6B7280]">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#0D3B33] transition hover:text-[#00AAA6]"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
