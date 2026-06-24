import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { userAPI } from "../services/userAPI";

export default function Register() {
  const navigate = useNavigate();

  // State untuk form data, loading, dan error
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
    setSuccessMsg("");

    try {
      // Menembak data pendaftaran langsung ke Supabase
      await userAPI.registerUser(formData);

      setSuccessMsg("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed.",
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* 🔹 LEFT (IMAGE) */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-black">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070"
          alt="coffee"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        <div className="relative z-10 p-12 text-white flex flex-col justify-between">
          <h1 className="text-2xl font-bold">Papi Coffee</h1>

          <div>
            <h2 className="text-3xl font-semibold italic mb-4">
              The ritual of morning excellence.
            </h2>
            <p className="text-sm text-gray-200">
              Join our community of artisanal roasters and coffee lovers.
            </p>
          </div>

          <span className="text-xs opacity-60">Est. 2024</span>
        </div>
      </div>

      {/* 🔹 RIGHT (FORM) */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Create Account
            </h3>
            <p className="text-sm text-gray-500">
              Start your coffee journey ☕
            </p>
          </div>

          {/* Notifikasi Alert */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm">
              {successMsg}
            </div>
          )}

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="username"
                  required
                  disabled={loading}
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                />
                <User
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  disabled={loading}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                />
                <Mail
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  name="password"
                  required
                  disabled={loading}
                  value={formData.password}
                  onChange={handleChange} // ← SEKARANG SUDAH DITAMBAHKAN DI SINI
                  placeholder="********"
                  minLength={8}
                  className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                />
                <Lock
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Min 8 characters</p>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
