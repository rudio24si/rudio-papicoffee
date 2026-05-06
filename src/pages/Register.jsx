import { Link } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* 🔹 LEFT (IMAGE) */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-black">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF5ppzubt9tUFcqe12catoHWsG7bn2UJjZI6mpmsBsrqoefUTvIdUKisy1SvoK0LyPYWtnt7a5WDzLzRFl57ZInoI2GwEG-HaEEVwCU08XtN2csKejAX-uzVe-JyZ8hr95AUDqNqdTdIvoHg6uV0igKe4Jqv4LFXFTw40CU33HVeyKCnpqHiMi2Qpa9hLm5z26m2F0ZNz1oC9yvTPzFFAT-GEmbesaHmlPzN-FL19nKLgFGmErCSurPbG1kvKvPpg9oUARPE9AxUY"
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

          {/* FORM */}
          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-black outline-none"
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
                  placeholder="you@email.com"
                  className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-black outline-none"
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
                  placeholder="********"
                  className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-black outline-none"
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
              className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Create Account
              <ArrowRight size={16} />
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
