import { Link } from "react-router-dom";

const features = [
  {
    title: "Analitik Penjualan",
    description: "Dapatkan insight cepat untuk bisnis kopi dengan ringkasan penjualan dan tren harian.",
    icon: "☕",
  },
  {
    title: "Member & Loyalty",
    description: "Kelola program loyalitas dan data member dalam satu tempat yang mudah dipahami.",
    icon: "⭐",
  },
  {
    title: "Order & Antrian",
    description: "Atur order dan antrian barista dengan efisien untuk pengalaman pelanggan lebih baik.",
    icon: "📋",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F7F8F8] text-[#0D3B33]">
      <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
        <header className="flex flex-col gap-6 items-center justify-between lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-[#0D3B33] text-white grid place-items-center text-[18px]">
              ☕
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#0D3B33]/70 font-semibold">
                Papi Coffee
              </p>
              <p className="text-sm text-[#0D3B33]/70">CRM untuk coffee shop</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-4 text-sm font-medium text-[#0D3B33]/80">
            <a href="#features" className="hover:text-[#0D3B33] transition">
              Fitur
            </a>
            <a href="#about" className="hover:text-[#0D3B33] transition">
              Tentang
            </a>
            <a href="#footer" className="hover:text-[#0D3B33] transition">
              Kontak
            </a>
          </nav>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full bg-[#B8EDE3] px-5 py-2.5 text-sm font-semibold text-[#0D3B33] shadow-sm shadow-[#0D3B33]/10 transition hover:bg-[#9de5d4]"
          >
            Coba Gratis
          </Link>
        </header>

        <main className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section>
            <span className="inline-flex rounded-full bg-[#B8EDE3]/30 px-4 py-2 text-sm font-semibold text-[#0D3B33]">
              Landing Page MVP
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#0D3B33] sm:text-5xl">
              Kelola Coffee Shop Kamu Lebih Mudah dengan Papi Coffee CRM
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#0D3B33]/80 sm:text-lg">
              Satu dashboard untuk order, member, loyalty, stok, dan analitik. Dibuat untuk pemilik kedai kopi yang ingin bisnis lebih teratur tanpa repot.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-[#0D3B33] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0D3B33]/20 transition hover:bg-[#0b332c]"
              >
                Mulai Sekarang
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-[#0D3B33]/20 bg-white px-7 py-3 text-sm font-semibold text-[#0D3B33] transition hover:border-[#0D3B33]"
              >
                Lihat Fitur
              </a>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[32px] border border-[#0D3B33]/10 bg-white p-6 shadow-[0_30px_80px_rgba(13,59,51,0.08)] sm:p-8">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#B8EDE3]/50 to-transparent"></div>
            <div className="relative rounded-[28px] bg-[#0D3B33] p-6 text-white sm:p-8">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#B8EDE3]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">📊</span>
                Dashboard Admin
              </div>
              <div className="mt-8 space-y-4 rounded-[24px] bg-[#062823] p-5 text-sm text-[#D8F5EE]">
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-white/5 p-4">
                  <div>
                    <p className="text-xs uppercase text-[#B8EDE3]/80">Penjualan Hari Ini</p>
                    <p className="mt-2 text-2xl font-semibold">Rp 18.450.000</p>
                  </div>
                  <div className="rounded-3xl bg-[#B8EDE3]/10 px-3 py-2 text-xs text-[#B8EDE3]">
                    +18%
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs uppercase text-[#B8EDE3]/80">Member Aktif</p>
                    <p className="mt-2 text-xl font-semibold">540</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs uppercase text-[#B8EDE3]/80">Order Terselesaikan</p>
                    <p className="mt-2 text-xl font-semibold">286</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <section id="features" className="mt-20">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">
              Fitur Utama
            </p>
            <h2 className="text-3xl font-semibold text-[#0D3B33] sm:text-4xl">
              Solusi sederhana untuk pengelolaan coffee shop.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[28px] border border-[#0D3B33]/10 bg-white p-6 shadow-sm shadow-[#0D3B33]/5">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#B8EDE3]/30 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#0D3B33]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#0D3B33]/75">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mt-20 rounded-[32px] bg-white p-8 shadow-[0_24px_60px_rgba(13,59,51,0.08)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0D3B33]/60">
                Tentang Papi Coffee CRM
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">
                Dirancang untuk pemilik kedai kopi yang ingin fokus pada pelanggan.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#0D3B33]/80">
                Dengan tampilan yang bersih, data yang mudah dibaca, dan kontrol order di satu tempat, Papi Coffee CRM membantu tim kecil membuat keputusan lebih cepat dan melayani tamu lebih baik.
              </p>
            </div>
            <div className="rounded-[28px] bg-[#F1FFFB] p-6 text-[#0D3B33]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0D3B33]/70">Quick Highlights</p>
              <ul className="mt-5 space-y-4 text-sm leading-7">
                <li>• Analitik penjualan intuitif untuk setiap shift.</li>
                <li>• Sistem loyalty sederhana untuk pelanggan setia.</li>
                <li>• Dashboard yang mobile-friendly dan mudah dipelajari.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[32px] bg-[#0D3B33] px-8 py-12 text-white shadow-[0_30px_80px_rgba(13,59,51,0.18)] sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#B8EDE3]/80">
                Siap untuk mulai?
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Coba Papi Coffee CRM sekarang, gratis.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[#B8EDE3] px-6 py-3 text-sm font-semibold text-[#0D3B33] shadow-md shadow-[#0D3B33]/20 transition hover:bg-[#a7e4d3]"
              >
                Mulai Percobaan
              </Link>
            </div>
          </div>
        </section>
      </div>

      <footer id="footer" className="border-t border-[#0D3B33]/10 bg-white py-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 text-sm text-[#0D3B33]/70 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0D3B33] text-white">
              ☕
            </div>
            <div>
              <p className="font-semibold text-[#0D3B33]">Papi Coffee</p>
              <p className="text-xs">© 2026 Papi Coffee CRM</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-[#0D3B33]">Instagram</a>
            <a href="#" className="hover:text-[#0D3B33]">LinkedIn</a>
            <a href="#" className="hover:text-[#0D3B33]">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
