import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    // h-screen dan overflow-hidden penting agar tidak ada scrollbar di body luar
    <div className="flex h-screen w-full bg-[#F5F5F5] overflow-hidden font-sans">
      <Sidebar />

      {/* Area Utama */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        {/* Kontainer Content: h-full dan overflow-y-auto agar dashboard bisa di-scroll internal */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
