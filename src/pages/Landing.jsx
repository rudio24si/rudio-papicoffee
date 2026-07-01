import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Analitik Real-time",
    description: "Lihat performa penjualan, margin, dan tren harian secara langsung di satu dashboard.",
    icon: "📊",
  },
  {
    title: "Order & Transaksi",
    description: "Atur order, pembayaran, dan antrian barista tanpa harus pindah aplikasi.",
    icon: "🧾",
  },
  {
    title: "Member & Loyalty",
    description: "Bangun program loyalitas yang mudah digunakan untuk pelanggan setia.",
    icon: "💳",
  },
  {
    title: "Antrian Pintar",
    description: "Kelola queue dan prioritas pesanan agar layanan tetap cepat dan rapi.",
    icon: "⏱️",
  },
  {
    title: "Segmentasi Pelanggan",
    description: "Kelompokkan pelanggan dan kirim promo yang tepat ke target yang benar.",
    icon: "👥",
  },
  {
    title: "Campaign & Promosi",
    description: "Rancang promo khusus dan pantau efektivitasnya dalam sekali lihat.",
    icon: "🎯",
  },
];

const steps = [
  {
    title: "Daftar & Setup Toko",
    description: "Mulai dengan akun baru, lalu tambahkan outlet dan menu kopi kamu.",
  },
  {
    title: "Hubungkan Kasir/Order",
    description: "Sinkronkan transaksi dan antrian agar data selalu update.",
  },
  {
    title: "Pantau Dashboard",
    description: "Lihat performa harian, member aktif, dan stok dalam satu tampilan.",
  },
  {
    title: "Analisis & Kembangkan",
    description: "Gunakan insight penjualan untuk memperbaiki menu dan promosi.",
  },
];

const testimonials = [
  {
    quote: "Dengan Papi Coffee, antrian jadi lebih cepat dan laporan penjualan langsung rapi.",
    name: "Rina Santoso",
    role: "Pemilik Kedai Kopi Bean & Brew",
    rating: 5,
  },
  {
    quote: "Sistem loyalty membuat pelanggan kembali lebih sering, tanpa perlu ribet.",
    name: "Budi Prasetya",
    role: "Manajer Operasional Kopi Kota",
    rating: 5,
  },
  {
    quote: "Semua data stok dan transaksi bisa dipantau dari satu layar, sangat membantu.",
    name: "Mia Amanda",
    role: "Owner Coffee Barista",
    rating: 4,
  },
];

const pricing = [
  {
    name: "Starter",
    price: "Rp 149.000",
    description: "Untuk kedai kopi kecil yang ingin mulai digital.",
    features: ["Dashboard penjualan", "Manajemen order", "Program loyalty dasar"],
    featured: false,
  },
  {
    name: "Pro",
    price: "Rp 249.000",
    description: "Paket populer untuk pemilik coffee shop aktif.",
    features: ["Semua fitur Starter", "Antrian pintar", "Segmentasi pelanggan"],
    featured: true,
  },
  {
    name: "Business",
    price: "Rp 399.000",
    description: "Untuk multi-cabang dengan kebutuhan promosi lanjutan.",
    features: ["Semua fitur Pro", "Campaign & promosi", "Support prioritas"],
    featured: false,
  },
];

const faqs = [
  {
    question: "Apakah ada trial gratis?",
    answer: "Ya, kamu bisa mencoba Papi Coffee CRM secara gratis sebelum memutuskan paket yang tepat.",
  },
  {
    question: "Bisakah digunakan untuk multi-cabang?",
    answer: "Tentu, paket Business mendukung manajemen beberapa outlet sekaligus.",
  },
  {
    question: "Apakah sistem ini bisa terhubung ke kasir saya?",
    answer: "Papi Coffee CRM dirancang untuk mudah sinkron dengan proses order dan kasir digital.",
  },
  {
    question: "Bagaimana keamanan data pelanggan?",
    answer: "Data disimpan dengan standar keamanan yang aman dan hanya diakses oleh tim Anda.",
  },
  {
    question: "Apakah saya bisa mengatur promo sendiri?",
    answer: "Ya, kamu bisa membuat campaign promo dan loyalty langsung dari dashboard.",
  },
  {
    question: "Bagaimana cara menghubungi support jika ada kendala?",
    answer: "Tim support siap membantu lewat email, chat, atau telepon pada jam kerja.",
  },
];

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;
      setShowStickyCta(window.scrollY > hero.clientHeight - 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F8] text-[#1A1A1A]">
      <div className="sticky top-0 z-50 border-b border-[#0D3B33]/10 bg-[#F7F8F8]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3 text-[#0D3B33]">
            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#0D3B33] text-white text-2xl shadow-sm shadow-[#0D3B33]/15">
              ☕
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em]">Papi Coffee</p>
              <p className="text-xs text-[#6B7280]">CRM untuk Coffee Shop</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#1A1A1A]/80 lg:flex">
            <a href="#features" className="transition hover:text-[#0D3B33]">
              Fitur
            </a>
            <a href="#how-it-works" className="transition hover:text-[#0D3B33]">
              Cara Kerja
            </a>
            <a href="#testimonials" className="transition hover:text-[#0D3B33]">
              Testimoni
            </a>
            <a href="#pricing" className="transition hover:text-[#0D3B33]">
              Harga
            </a>
            <a href="#faq" className="transition hover:text-[#0D3B33]">
              FAQ
            </a>
          </nav>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full bg-[#0D3B33] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#0D3B33]/20 transition hover:bg-[#0A2E28]"
          >
            Coba Gratis
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:py-16">
        <section id="hero-section" className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-[#B8EDE3]/30 px-4 py-2 text-sm font-semibold text-[#0D3B33]">
              Dipercaya oleh 100+ coffee shop
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#0D3B33] sm:text-5xl lg:text-6xl">
              Kelola kedai kopi kamu lebih cerdas dengan Papi Coffee CRM
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6B7280] sm:text-lg">
              Dashboard all-in-one untuk order, member, loyalty, stok, dan analitik penjualan. Buat operasional lebih efisien tanpa perlu laporan manual.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-[#0D3B33] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0D3B33]/20 transition hover:bg-[#0A2E28]"
              >
                Mulai Gratis
              </Link>
              <a
                href="#showcase"
                className="inline-flex items-center justify-center rounded-full border border-[#0D3B33]/20 bg-white px-7 py-3 text-sm font-semibold text-[#0D3B33] transition hover:border-[#0D3B33]"
              >
                Lihat Demo
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-[#0D3B33]/10 bg-white p-6 shadow-[0_30px_80px_rgba(13,59,51,0.08)] sm:p-8">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl bg-[#B8EDE3]/30 px-4 py-2 text-sm font-semibold text-[#0D3B33]">
                  Live dashboard
                </div>
                <div className="text-sm text-[#6B7280]">Ringkasan kinerja harian</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#0D3B33] p-5 text-white shadow-lg shadow-[#0D3B33]/10">
                  <p className="text-xs uppercase text-[#B8EDE3]/80">Penjualan Hari Ini</p>
                  <p className="mt-4 text-3xl font-semibold">Rp 18.450.000</p>
                </div>
                <div className="rounded-3xl bg-[#F7F8F8] p-5">
                  <p className="text-xs uppercase text-[#0D3B33]/60">Member Aktif</p>
                  <p className="mt-4 text-3xl font-semibold text-[#0D3B33]">540</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-[24px] bg-[#F1FFFB] p-4">
                  <div className="flex items-center justify-between text-sm text-[#0D3B33]">
                    <span>Tren Penjualan</span>
                    <span className="rounded-full bg-[#C6E85C]/20 px-3 py-1 text-xs font-semibold text-[#0D3B33]">+18%</span>
                  </div>
                  <div className="mt-4 h-24 rounded-3xl bg-gradient-to-r from-[#B8EDE3] to-[#0D3B33]" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Transaksi Terakhir</p>
                    <p className="mt-3 font-semibold text-[#0D3B33]">12 order baru</p>
                  </div>
                  <div className="rounded-[24px] bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Menu Terlaris</p>
                    <p className="mt-3 font-semibold text-[#0D3B33]">Caramel Latte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[28px] bg-[#FFFFFF] p-6 shadow-[0_20px_50px_rgba(13,59,51,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Social Proof</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#0D3B33] sm:text-3xl">Digunakan oleh coffee shop di 10+ kota.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {['KopiKita','BeanHouse','RoastLab','CafeRina'].map((brand) => (
                <div key={brand} className="rounded-3xl bg-[#F7F8F8] px-4 py-3 text-center text-sm font-semibold text-[#0D3B33]">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="problem-solution" className="mt-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[#0D3B33]/10 bg-white p-8 shadow-sm shadow-[#0D3B33]/5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0D3B33]/60">Tantangan tanpa CRM</p>
              <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33]">Pencatatan manual bikin operasi lambat.</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#6B7280]">
                <li>• Data order tercecer di catatan dan Excel.</li>
                <li>• Stok tidak terpantau, sering kehabisan bahan mendadak.</li>
                <li>• Member dan loyalty sulit diatur tanpa sistem.
                </li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-[#B8EDE3]/50 bg-[#F1FFFB] p-8 shadow-sm shadow-[#0D3B33]/5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0D3B33]/60">Dengan Papi Coffee CRM</p>
              <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33]">All-in-one untuk operasi kedai kopi lebih lancar.</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#0D3B33]/80">
                <li>• Order, loyalty, dan stok terintegrasi dalam satu dashboard.</li>
                <li>• Insight penjualan real-time untuk keputusan cepat.</li>
                <li>• Manajemen antrian dan promo jadi lebih mudah.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Fitur Utama</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Semua kebutuhan coffee shop dalam satu platform.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="group rounded-[24px] border border-[#0D3B33]/10 bg-white p-6 shadow-sm shadow-[#0D3B33]/5 transition duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#B8EDE3]/30 text-2xl transition group-hover:bg-[#0D3B33] group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#0D3B33]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mt-20 rounded-[32px] bg-white p-8 shadow-[0_24px_60px_rgba(13,59,51,0.08)] sm:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Cara Kerja</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Mulai dalam empat langkah sederhana.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[24px] border border-[#0D3B33]/10 bg-[#F7F8F8] p-6 text-[#0D3B33] shadow-sm shadow-[#0D3B33]/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#0D3B33] text-xl font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="showcase" className="mt-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Showcase</p>
              <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Intip dashboard yang membuat operasional lebih cepat.</h2>
              <p className="mt-5 text-base leading-8 text-[#6B7280]">
                Preview visual dari ringkasan toko, tren penjualan, transaksi, dan menu terlaris dengan gaya yang profesional dan mudah dibaca.
              </p>
            </div>
            <div className="relative">
              <div className="h-full w-full overflow-hidden rounded-[32px] border border-[#0D3B33]/10 bg-[#FFFFFF] shadow-[0_40px_100px_rgba(13,59,51,0.08)]">
                <div className="flex items-center justify-between border-b border-[#0D3B33]/10 bg-[#F7F8F8] px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="rounded-full bg-[#B8EDE3]/30 px-3 py-1 text-xs font-semibold text-[#0D3B33]">Preview</span>
                </div>
                <div className="space-y-6 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-[#0D3B33] p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#B8EDE3]/80">Ringkasan Penjualan</p>
                      <p className="mt-4 text-3xl font-semibold">Rp 18.450.000</p>
                    </div>
                    <div className="rounded-[24px] bg-[#F7F8F8] p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">Laba Bersih</p>
                      <p className="mt-4 text-3xl font-semibold text-[#0D3B33]">Rp 4.820.000</p>
                    </div>
                  </div>
                  <div className="rounded-[24px] bg-[#F7F8F8] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">Tren Penjualan per Jam</p>
                    <div className="mt-4 flex h-32 items-end gap-2">
                      <span className="h-12 w-full rounded-t-full bg-[#B8EDE3]" />
                      <span className="h-20 w-full rounded-t-full bg-[#0D3B33]" />
                      <span className="h-16 w-full rounded-t-full bg-[#B8EDE3]" />
                      <span className="h-24 w-full rounded-t-full bg-[#0D3B33]" />
                      <span className="h-10 w-full rounded-t-full bg-[#B8EDE3]" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Transaksi Terakhir</p>
                      <p className="mt-3 font-semibold text-[#0D3B33]">12 order baru</p>
                    </div>
                    <div className="rounded-[24px] bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Menu Terlaris</p>
                      <p className="mt-3 font-semibold text-[#0D3B33]">Caramel Latte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Testimoni</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Apa kata pemilik kedai kopi?</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[28px] border border-[#0D3B33]/10 bg-white p-6 shadow-sm shadow-[#0D3B33]/5">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#B8EDE3]/30 text-2xl">👤</div>
                  <div>
                    <p className="font-semibold text-[#0D3B33]">{item.name}</p>
                    <p className="text-sm text-[#6B7280]">{item.role}</p>
                  </div>
                </div>
                <p className="text-base leading-8 text-[#6B7280]">“{item.quote}”</p>
                <div className="mt-6 flex gap-1 text-[#F6C22C]">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <span key={idx}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="comparison" className="mt-20 rounded-[32px] bg-white p-8 shadow-[0_24px_60px_rgba(13,59,51,0.08)] sm:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Perbandingan</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Manual vs Papi Coffee CRM</h2>
          </div>
          <div className="mt-10 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-4 text-left">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-[#6B7280]">Aspek</th>
                  <th className="px-4 py-3 text-sm font-semibold text-[#6B7280]">Cara Manual</th>
                  <th className="px-4 py-3 text-sm font-semibold text-[#6B7280]">Papi Coffee CRM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Pencatatan omzet', 'Manual, rawan salah', 'Otomatis & real-time'],
                  ['Data pelanggan', 'Tercecer', 'Terpusat & tersegmentasi'],
                  ['Stok bahan baku', 'Dicek manual', 'Notifikasi restock otomatis'],
                  ['Laporan', 'Rekap manual', 'Dashboard analitik instan'],
                ].map(([label, manual, crm]) => (
                  <tr key={label} className="rounded-[24px] bg-[#F7F8F8]">
                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#0D3B33]">{label}</td>
                    <td className="px-4 py-4 text-sm text-[#6B7280]">{manual}</td>
                    <td className="px-4 py-4 text-sm text-[#0D3B33]">{crm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="pricing" className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Harga</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Pilih paket yang cocok untuk kedai kopi kamu.</h2>
          </div>
          <div className="mt-10 grid gap-5 xl:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className={`rounded-[32px] border p-8 shadow-sm transition duration-200 ${plan.featured ? "border-[#0D3B33] bg-[#0D3B33] text-white shadow-[#0D3B33]/15" : "border-[#0D3B33]/10 bg-white text-[#1A1A1A] hover:-translate-y-1 hover:shadow-md"}`}>
                {plan.featured && <div className="mb-4 inline-flex rounded-full bg-[#C6E85C]/20 px-3 py-1 text-xs font-semibold text-[#0D3B33]">Paling Populer</div>}
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className={`mt-3 text-sm leading-7 ${plan.featured ? "text-[#D8F5EE]" : "text-[#6B7280]"}`}>{plan.description}</p>
                <p className={`mt-8 text-4xl font-bold ${plan.featured ? "text-white" : "text-[#0D3B33]"}`}>{plan.price}</p>
                <ul className={`mt-6 space-y-3 text-sm leading-7 ${plan.featured ? "text-[#E9FBF6]" : "text-[#6B7280]"}`}>
                  {plan.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${plan.featured ? "bg-white text-[#0D3B33] hover:bg-[#f3f3f3]" : "bg-[#0D3B33] text-white hover:bg-[#0A2E28]"}`}
                >
                  Pilih Paket
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-20 rounded-[32px] bg-white p-8 shadow-[0_24px_60px_rgba(13,59,51,0.08)] sm:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Pertanyaan umum seputar Papi Coffee CRM.</h2>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.question} className="overflow-hidden rounded-[24px] border border-[#0D3B33]/10">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 bg-[#F7F8F8] px-6 py-5 text-left text-sm font-semibold text-[#0D3B33] transition hover:bg-[#EEF7F5]"
                  >
                    <span>{item.question}</span>
                    <span className="text-xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-0"}`}>
                    <p className="px-6 pb-5 text-sm leading-7 text-[#6B7280]">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20 rounded-[32px] bg-[#0D3B33] px-8 py-14 text-white shadow-[0_30px_80px_rgba(13,59,51,0.18)] sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#B8EDE3]/80">Siap mengubah kedai kopi kamu?</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Mulai sekarang dan bawa manajemen kedai ke level berikutnya.</h2>
            </div>
            <Link
              to="/login"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[#B8EDE3] px-6 py-4 text-sm font-semibold text-[#0D3B33] shadow-md shadow-[#0D3B33]/20 transition hover:bg-[#a7e4d3]"
            >
              Coba Gratis Sekarang
            </Link>
          </div>
        </section>
      </main>

      {showStickyCta && (
        <div className="fixed inset-x-0 bottom-0 z-50 block md:hidden">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between bg-[#0D3B33] px-4 py-3 text-white shadow-[0_-10px_30px_rgba(13,59,51,0.18)]">
            <div>
              <p className="text-sm font-semibold">Coba Papi Coffee CRM</p>
              <p className="text-xs text-[#B8EDE3]">Daftar trial gratis sekarang</p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-[#B8EDE3] px-4 py-2 text-sm font-semibold text-[#0D3B33] shadow-sm shadow-[#0D3B33]/20"
            >
              Coba Gratis
            </Link>
          </div>
        </div>
      )}

      <footer id="footer" className="border-t border-[#0D3B33]/10 bg-white py-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 text-sm text-[#6B7280] sm:grid-cols-[1.5fr_1fr] sm:px-8 lg:grid-cols-[1.7fr_1fr_1fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[#0D3B33]">
              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#0D3B33] text-white text-2xl">☕</div>
              <div>
                <p className="text-lg font-semibold">Papi Coffee</p>
                <p className="text-sm text-[#6B7280]">CRM pemasaran untuk coffee shop modern.</p>
              </div>
            </div>
            <p className="max-w-sm leading-7">
              Bangun operasi kedai kopi lebih terstruktur dengan pelanggan yang lebih puas, order lebih cepat, dan laporan yang mudah dimengerti.
            </p>
          </div>
          <div>
            <p className="mb-4 font-semibold uppercase tracking-[0.24em] text-[#0D3B33]/70">Navigasi</p>
            <ul className="space-y-3">
              <li><a href="#features" className="transition hover:text-[#0D3B33]">Fitur</a></li>
              <li><a href="#how-it-works" className="transition hover:text-[#0D3B33]">Cara Kerja</a></li>
              <li><a href="#pricing" className="transition hover:text-[#0D3B33]">Harga</a></li>
              <li><a href="#faq" className="transition hover:text-[#0D3B33]">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 font-semibold uppercase tracking-[0.24em] text-[#0D3B33]/70">Kontak</p>
            <ul className="space-y-3 text-[#6B7280]">
              <li>Email: hello@papicoffee.id</li>
              <li>Instagram: @papicoffeecrm</li>
              <li>Telp: +62 812 3456 7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[#0D3B33]/10 pt-6 text-center text-xs text-[#6B7280]">
          © 2026 Papi Coffee CRM. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
