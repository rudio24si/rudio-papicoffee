import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { userAPI } from "../services/userAPI"; // ← Import file service API

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

      // ✅ Langsung cek objectnya, bukan .length
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
        navigate("/");
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
    <div className="min-h-screen flex items-center justify-center relative px-4 bg-gray-50">
      {/* 🔹 Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070"
          alt="coffee"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-gray-100"></div>
      </div>

      {/* 🔹 Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Papi Coffee</h1>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>

        {/* Notifikasi Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
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
              placeholder="Username"
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none transition disabled:bg-gray-200"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between text-sm">
              <label className="text-gray-600 font-medium">Password</label>
              <Link to="/forgot" className="hover:underline text-gray-400">
                Forgot?
              </Link>
            </div>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                disabled={loading}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none transition disabled:bg-gray-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-black hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
