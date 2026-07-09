import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MENU_CATEGORIES } from "../data/menu";

// ─── Menu Section Component ───────────────────────────────────────────────────
const CATEGORY_EMOJI = {
  "Kopi Susu":       "🧊",
  "Black Coffee":    "☕",
  "Non Coffee":      "🧃",
  "Matcha Series":   "🍵",
  "Affogato Series": "🍨",
  "Snack":           "🍟",
  "Extra Topping":   "✨",
};

function MenuSection() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].category);
  const activeItems = MENU_CATEGORIES.find((c) => c.category === activeTab)?.items || [];

  return (
    <div className="mt-8">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveTab(cat.category)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === cat.category
                ? "bg-[#0D3B33] text-white shadow-md shadow-[#0D3B33]/20"
                : "bg-white border border-[#0D3B33]/15 text-[#0D3B33]/70 hover:border-[#0D3B33]/40"
            }`}
          >
            <span>{CATEGORY_EMOJI[cat.category]}</span>
            {cat.category}
          </button>
        ))}
      </div>

      {/* Grid items */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {activeItems.map((item) => (
          <div
            key={item.name}
            className="group rounded-[20px] border border-[#0D3B33]/10 bg-white p-4 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-[#0D3B33]/30 transition-all duration-200"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B8EDE3]/30 text-xl group-hover:bg-[#0D3B33] group-hover:text-white transition-colors">
              {CATEGORY_EMOJI[activeTab]}
            </div>
            <p className="text-sm font-semibold text-[#0D3B33] leading-snug">{item.name}</p>
            <p className="mt-2 text-base font-bold text-[#0D3B33]">
              Rp {item.price.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">Harga Reguler</p>
          </div>
        ))}
      </div>

      {/* Extra Topping note */}
      {activeTab !== "Extra Topping" && (
        <p className="mt-6 text-center text-xs text-[#6B7280]">
          ✨ Tambahkan topping: Extrashoot Espresso (7k) · Vanilla Ice Cream (5k) · Jelly Coklat (2k) · Oat Milk (7k)
        </p>
      )}
    </div>
  );
}

const features = [
  {
    title: "Menu variatif untuk semua selera",
    description: "Temukan pilihan kopi susu, non coffee, black coffee, matcha, affogato, dan snack yang cocok untuk setiap momen.",
    icon: "☕",
  },
  {
    title: "Custom sesuai selera",
    description: "Atur tingkat gula jadi No Sugar, Less Sugar, Normal, atau Extra Sugar, lalu tambahkan topping favorit Anda.",
    icon: "✨",
  },
  {
    title: "Poin & reward member",
    description: "Setiap Rp10.000 belanja sama dengan 1 poin, dan 50 poin bisa ditukar menjadi 1 minuman gratis.",
    icon: "💳",
  },
  {
    title: "Tier Silver, Gold, Platinum",
    description: "Semakin sering datang, semakin besar benefit yang bisa Anda nikmati sebagai member.",
    icon: "🏅",
  },
  {
    title: "Promo menarik setiap minggu",
    description: "Nikmati Senin Hemat, Weekend Bundle, dan promo musiman seperti Ramadan Special.",
    icon: "🎉",
  },
  {
    title: "Bebas pilih cara menikmati",
    description: "Pilih dine-in, take away, atau delivery agar minuman favorit Anda tetap sampai dengan nyaman.",
    icon: "📱",
  },
];

const steps = [
  {
    title: "Pilih menu & sesuaikan pesanan",
    description: "Pilih favorit Anda, lalu atur tingkat gula dan topping sesuai selera.",
  },
  {
    title: "Pesan sesuai kenyamanan Anda",
    description: "Nikmati pengalaman dine-in, take away, atau order delivery lewat mitra ojek online.",
  },
  {
    title: "Bayar dengan metode yang praktis",
    description: "Pilih QRIS, e-wallet, cash, atau debit untuk transaksi yang lebih fleksibel.",
  },
  {
    title: "Kumpulkan poin & tukar reward",
    description: "Setiap transaksi member akan menambah poin dan membuka kesempatan reward yang lebih menarik.",
  },
];

const testimonials = [
  {
    quote: "Rasanya konsisten, tempatnya nyaman, dan cocok buat nongkrong santai atau kerja sebentar.",
    name: "Ayu",
    role: "Pelanggan Setia",
    rating: 5,
  },
  {
    quote: "Saya suka bisa pilih tingkat gula dan topping, jadi minuman favorit selalu pas di lidah.",
    name: "Rizki",
    role: "Pelanggan Regular",
    rating: 5,
  },
  {
    quote: "Program member-nya jelas dan reward-nya bikin saya makin sering balik lagi.",
    name: "Nadia",
    role: "Member Gold",
    rating: 5,
  },
];

const pricing = [
  {
    name: "Silver",
    price: "Mulai dari member aktif",
    description: "Tingkat awal member yang membuat setiap transaksi semakin bernilai lewat poin loyalti.",
    features: ["Kumpulkan poin tiap belanja", "Akses promo rutin", "Reward sederhana untuk member"],
    featured: false,
  },
  {
    name: "Gold",
    price: "Berdasarkan aktivitas belanja",
    description: "Tingkat yang cocok bagi pelanggan yang sering datang dan ingin benefit yang lebih menarik.",
    features: ["Promo lebih awal", "Reward yang lebih besar", "Benefit loyalti yang makin terasa"],
    featured: true,
  },
  {
    name: "Platinum",
    price: "Tier tertinggi",
    description: "Nikmati pengalaman member yang lebih eksklusif dengan reward dan promo yang lebih unggul.",
    features: ["Benefit loyalti yang lebih besar", "Promo eksklusif", "Prioritas reward khusus member"],
    featured: false,
  },
];

const faqs = [
  {
    question: "Bagaimana cara jadi member Papi Coffee?",
    answer: "Anda bisa mendaftar sebagai member saat berkunjung atau mengikuti informasi yang kami bagikan melalui Instagram dan WhatsApp.",
  },
  {
    question: "Bagaimana cara kerja poin & reward?",
    answer: "Setiap Rp10.000 belanja akan dikonversi menjadi 1 poin, dan 50 poin bisa ditukar menjadi 1 minuman gratis.",
  },
  {
    question: "Apa bedanya tier Silver, Gold, dan Platinum?",
    answer: "Ketiga tier ini mewakili level benefit member yang berbeda, semakin sering berbelanja maka benefit yang didapat akan semakin besar.",
  },
  {
    question: "Apakah bisa custom tingkat gula atau tambah topping?",
    answer: "Tentu. Anda bisa memilih level gula sesuai selera dan menambahkan topping favorit pada pesanan Anda.",
  },
  {
    question: "Apakah Papi Coffee melayani delivery?",
    answer: "Ya, Papi Coffee melayani delivery melalui kerja sama dengan ojek online agar pesanan Anda tetap mudah didapat.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima pembayaran melalui QRIS, e-wallet, cash, dan debit.",
  },
  {
    question: "Apakah ada promo mingguan atau musiman?",
    answer: "Tentu. Papi Coffee rutin menghadirkan promo seperti Senin Hemat, Weekend Bundle, dan Ramadan Special.",
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
              <p className="text-xs text-[#6B7280]">Tempat ngopi yang nyaman</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#1A1A1A]/80 lg:flex">
            <a href="#menu" className="transition hover:text-[#0D3B33]">
              Menu
            </a>
            <a href="#features" className="transition hover:text-[#0D3B33]">
              Fitur
            </a>
            <a href="#how-it-works" className="transition hover:text-[#0D3B33]">
              Cara Kerja
            </a>
            <a href="#testimonials" className="transition hover:text-[#0D3B33]">
              Testimoni
            </a>
            <a href="#membership" className="transition hover:text-[#0D3B33]">
              Membership
            </a>
            <a href="#faq" className="transition hover:text-[#0D3B33]">
              FAQ
            </a>
          </nav>

          <Link
            to="/#menu"
            className="inline-flex items-center justify-center rounded-full bg-[#0D3B33] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#0D3B33]/20 transition hover:bg-[#0A2E28]"
          >
            Pesan Sekarang
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:py-16">
        <section id="hero-section" className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-[#B8EDE3]/30 px-4 py-2 text-sm font-semibold text-[#0D3B33]">
              Kopi berkualitas, suasana nyaman, harga terjangkau
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#0D3B33] sm:text-5xl lg:text-6xl">
              Datanglah untuk menikmati kopi favorit, snack hangat, dan suasana yang bikin betah di Papi Coffee
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6B7280] sm:text-lg">
              Dari kopi susu dan black coffee hingga matcha, affogato, dan menu non-coffee, setiap kunjungan kami hadirkan dengan rasa yang nyaman, ramah, dan penuh pilihan.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/#menu"
                className="inline-flex items-center justify-center rounded-full bg-[#0D3B33] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0D3B33]/20 transition hover:bg-[#0A2E28]"
              >
                Lihat Menu
              </Link>
              <Link
                to="/#membership"
                className="inline-flex items-center justify-center rounded-full border border-[#0D3B33]/20 bg-white px-7 py-3 text-sm font-semibold text-[#0D3B33] transition hover:border-[#0D3B33]"
              >
                Gabung Jadi Member
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-[#0D3B33]/10 bg-white p-6 shadow-[0_30px_80px_rgba(13,59,51,0.08)] sm:p-8">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl bg-[#B8EDE3]/30 px-4 py-2 text-sm font-semibold text-[#0D3B33]">
                  Promo Aktif Hari Ini
                </div>
                <div className="text-sm text-[#6B7280]">Senin Hemat, Weekend Bundle, dan reward member</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#0D3B33] p-5 text-white shadow-lg shadow-[#0D3B33]/10">
                  <p className="text-xs uppercase text-[#B8EDE3]/80">Menu Favorit</p>
                  <p className="mt-4 text-3xl font-semibold">Kopi Susu & Matcha</p>
                </div>
                <div className="rounded-3xl bg-[#F7F8F8] p-5">
                  <p className="text-xs uppercase text-[#0D3B33]/60">Member Benefit</p>
                  <p className="mt-4 text-3xl font-semibold text-[#0D3B33]">Poin & Reward</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-[24px] bg-[#F1FFFB] p-4">
                  <div className="flex items-center justify-between text-sm text-[#0D3B33]">
                    <span>Promo Mingguan</span>
                    <span className="rounded-full bg-[#C6E85C]/20 px-3 py-1 text-xs font-semibold text-[#0D3B33]">Senin & Weekend</span>
                  </div>
                  <div className="mt-4 h-24 rounded-3xl bg-gradient-to-r from-[#B8EDE3] to-[#0D3B33]" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Custom Pesanan</p>
                    <p className="mt-3 font-semibold text-[#0D3B33]">Gula & topping sesuai selera</p>
                  </div>
                  <div className="rounded-[24px] bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Cara Nikmati</p>
                    <p className="mt-3 font-semibold text-[#0D3B33]">Dine-in, take away, delivery</p>
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
              <h2 className="mt-3 text-2xl font-semibold text-[#0D3B33] sm:text-3xl">Banyak pelanggan yang kembali karena rasa, suasana, dan reward-nya terasa nyata.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {['Rating pelanggan di Instagram & Google','Feedback positif dari pengunjung setia','Member loyalti yang aktif kembali','Update promo lewat Instagram & WhatsApp'].map((item) => (
                <div key={item} className="rounded-3xl bg-[#F7F8F8] px-4 py-3 text-center text-sm font-semibold text-[#0D3B33]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="problem-solution" className="mt-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[#0D3B33]/10 bg-white p-8 shadow-sm shadow-[#0D3B33]/5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0D3B33]/60">Kenapa pilih Papi Coffee</p>
              <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33]">Rasa yang nyaman, tempat yang hangat, dan harga yang tetap ramah di kantong.</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#6B7280]">
                <li>• Racikan kopi dan non-coffee yang siap menemani momen santai atau kerja.</li>
                <li>• Suasana bersih, nyaman, dan cocok untuk duduk lama maupun sekadar singgah sebentar.</li>
                <li>• Pelayanan yang cepat, ramah, dan tetap menjaga kualitas setiap pesanan.</li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-[#B8EDE3]/50 bg-[#F1FFFB] p-8 shadow-sm shadow-[#0D3B33]/5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0D3B33]/60">Yang membuat orang balik lagi</p>
              <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33]">Banyak yang datang bukan hanya untuk minum, tapi juga untuk merasakan pengalaman yang konsisten.</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#0D3B33]/80">
                <li>• Menu yang lengkap mulai dari kopi susu, black coffee, matcha, affogato, hingga snack.</li>
                <li>• Program member yang memberi poin, reward, dan promo menarik setiap bulannya.</li>
                <li>• Pilihan pesan yang fleksibel lewat dine-in, take away, atau delivery.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="menu" className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Menu Kami</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Pilihan lengkap untuk setiap selera.</h2>
            <p className="mt-4 text-sm text-[#6B7280]">Semua menu tersedia dalam ukuran Reguler & Large. Tersedia juga pilihan Botol 250mL untuk beberapa varian.</p>
          </div>

          {/* Category Tabs */}
          <MenuSection />
        </section>

        <section id="features" className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Kenapa Betah di Papi Coffee</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Hal yang membuat setiap kunjungan terasa istimewa.</h2>
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
              <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Lihat menu favorit, promo aktif, dan benefit member yang membuat kembali lagi.</h2>
              <p className="mt-5 text-base leading-8 text-[#6B7280]">
                Papi Coffee hadir untuk menemani momen santai, kerja, dan kumpul dengan pilihan menu yang variatif serta reward yang semakin terasa saat Anda jadi member.
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
                      <p className="text-xs uppercase tracking-[0.24em] text-[#B8EDE3]/80">Menu Unggulan</p>
                      <p className="mt-4 text-3xl font-semibold">Kopi Susu & Affogato</p>
                    </div>
                    <div className="rounded-[24px] bg-[#F7F8F8] p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">Promo Aktif</p>
                      <p className="mt-4 text-3xl font-semibold text-[#0D3B33]">Senin Hemat</p>
                    </div>
                  </div>
                  <div className="rounded-[24px] bg-[#F7F8F8] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">Member Experience</p>
                    <div className="mt-4 rounded-[24px] border border-[#0D3B33]/10 bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                      <div className="flex items-center justify-between text-sm text-[#0D3B33]">
                        <span className="font-semibold">Silver Member</span>
                        <span className="rounded-full bg-[#B8EDE3]/30 px-3 py-1 text-xs font-semibold text-[#0D3B33]">Poin siap ditukar</span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#6B7280]">Setiap transaksi menambah poin, dan reward bisa langsung dinikmati saat cukup.</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Cara Pesan</p>
                      <p className="mt-3 font-semibold text-[#0D3B33]">Dine-in, take away, delivery</p>
                    </div>
                    <div className="rounded-[24px] bg-white p-4 shadow-sm shadow-[#0D3B33]/5">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Pilihan Pembayaran</p>
                      <p className="mt-3 font-semibold text-[#0D3B33]">QRIS, e-wallet, cash, debit</p>
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
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Apa kata pelanggan Papi Coffee?</h2>
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

        <section id="membership" className="mt-20 rounded-[32px] bg-white p-8 shadow-[0_24px_60px_rgba(13,59,51,0.08)] sm:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">Membership</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Jadi member dan nikmati reward yang makin terasa saat Anda sering datang.</h2>
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
                  to="/#menu"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${plan.featured ? "bg-white text-[#0D3B33] hover:bg-[#f3f3f3]" : "bg-[#0D3B33] text-white hover:bg-[#0A2E28]"}`}
                >
                  Gabung Member
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-20 rounded-[32px] bg-white p-8 shadow-[0_24px_60px_rgba(13,59,51,0.08)] sm:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0D3B33]/60">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#0D3B33] sm:text-4xl">Pertanyaan umum seputar Papi Coffee.</h2>
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
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#B8EDE3]/80">Ingin pengalaman ngopi yang lebih nyaman?</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Datang dan rasakan suasana hangat, menu favorit, serta reward member yang makin menarik di Papi Coffee.</h2>
            </div>
            <Link
              to="/#menu"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[#B8EDE3] px-6 py-4 text-sm font-semibold text-[#0D3B33] shadow-md shadow-[#0D3B33]/20 transition hover:bg-[#a7e4d3]"
            >
              Pesan Sekarang
            </Link>
          </div>
        </section>
      </main>

      {showStickyCta && (
        <div className="fixed inset-x-0 bottom-0 z-50 block md:hidden">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between bg-[#0D3B33] px-4 py-3 text-white shadow-[0_-10px_30px_rgba(13,59,51,0.18)]">
            <div>
              <p className="text-sm font-semibold">Papi Coffee</p>
              <p className="text-xs text-[#B8EDE3]">Pesan sekarang dan nikmati suasana terbaik</p>
            </div>
            <Link
              to="/#menu"
              className="inline-flex items-center justify-center rounded-full bg-[#B8EDE3] px-4 py-2 text-sm font-semibold text-[#0D3B33] shadow-sm shadow-[#0D3B33]/20"
            >
              Pesan Sekarang
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
                <p className="text-sm text-[#6B7280]">Nikmati kopi favorit, snack hangat, dan reward member yang makin terasa.</p>
              </div>
            </div>
            <p className="max-w-sm leading-7">
              Nikmati kopi, non-coffee, snack, dan reward member di Papi Coffee dengan suasana yang nyaman untuk santai, kerja, atau kumpul.
            </p>
          </div>
          <div>
            <p className="mb-4 font-semibold uppercase tracking-[0.24em] text-[#0D3B33]/70">Navigasi</p>
            <ul className="space-y-3">
              <li><a href="#features" className="transition hover:text-[#0D3B33]">Fitur</a></li>
              <li><a href="#how-it-works" className="transition hover:text-[#0D3B33]">Cara Kerja</a></li>
              <li><a href="#membership" className="transition hover:text-[#0D3B33]">Membership</a></li>
              <li><a href="#faq" className="transition hover:text-[#0D3B33]">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 font-semibold uppercase tracking-[0.24em] text-[#0D3B33]/70">Kontak</p>
            <ul className="space-y-3 text-[#6B7280]">
              <li>Instagram: @papicoffee</li>
              <li>WhatsApp: hubungi kami melalui akun resmi</li>
              <li>Feedback dan pertanyaan pelanggan selalu kami sambut</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[#0D3B33]/10 pt-6 text-center text-xs text-[#6B7280]">
          © 2026 Papi Coffee. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
