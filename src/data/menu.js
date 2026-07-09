// Menu PAPI COFFEE — harga dalam Rupiah (Reg/default)

export const MENU_CATEGORIES = [
  {
    category: "Kopi Susu",
    items: [
      { name: "Kopi Mami", price: 20000 },
      { name: "Kopi Papi (Strong)", price: 22000 },
      { name: "Kopi Mami Premium", price: 22000 },
      { name: "Kopi Papi Premium (Strong)", price: 25000 },
      { name: "Caffe Latte (Tanpa Gula)", price: 22000 },
      { name: "Kopi Sanger (Strong)", price: 15000 },
      { name: "Kopi Butter (Hot)", price: 17000 },
      { name: "Kopi Rich Mami", price: 25000 },
      { name: "Kopi Buttersweet", price: 25000 },
      { name: "Kopi Caramel", price: 25000 },
      { name: "Kopi Cinnamon", price: 25000 },
      { name: "Kopi Pistacio", price: 25000 },
      { name: "Sugar Mami", price: 25000 },
    ],
  },
  {
    category: "Black Coffee",
    items: [
      { name: "Black Peach", price: 23000 },
      { name: "Black Orange", price: 23000 },
      { name: "Black Lemon", price: 20000 },
      { name: "Americano", price: 15000 },
      { name: "Americano Premium", price: 17000 },
      { name: "Mixberry Presso", price: 23000 },
      { name: "Manual Brew", price: 18000 },
    ],
  },
  {
    category: "Non Coffee",
    items: [
      { name: "Coklat (no jelly)", price: 17000 },
      { name: "Lemon Tea", price: 15000 },
      { name: "Nano Nano Tea", price: 15000 },
      { name: "Lhycee Tea", price: 18000 },
      { name: "Susu Strawberry", price: 22000 },
      { name: "Chocoberry", price: 27000 },
      { name: "Susu Kurma", price: 15000 },
    ],
  },
  {
    category: "Matcha Series",
    items: [
      { name: "Matcha Pure (tanpa gula)", price: 22000 },
      { name: "Matcha", price: 22000 },
      { name: "Matcha Pistacio", price: 25000 },
      { name: "Matcha Berry", price: 28000 },
      { name: "Matcha Espresso", price: 25000 },
    ],
  },
  {
    category: "Affogato Series",
    items: [
      { name: "Affogato", price: 21000 },
      { name: "Matchagato", price: 23000 },
    ],
  },
  {
    category: "Snack",
    items: [
      { name: "Tahu Bakso Porsi", price: 18000 },
      { name: "Donat Kentang Gula (isi 6pcs)", price: 20000 },
      { name: "Donat Kentang Meses (isi 6pcs)", price: 25000 },
      { name: "Donat Campur (Gula Meses isi 6pcs)", price: 23000 },
      { name: "Kentang Goreng", price: 20000 },
      { name: "Sphagetti Bolognese", price: 28000 },
      { name: "Macaroni Schotel", price: 28000 },
      { name: "Pisang Kipas Original (isi 3pcs)", price: 17000 },
      { name: "Pisang Kipas Coklat Keju", price: 17000 },
      { name: "Dimsum Original", price: 20000 },
      { name: "Dimsum Mentai", price: 33000 },
      { name: "Cookies Coklat", price: 11000 },
      { name: "Brownie Bites", price: 21000 },
      { name: "Kue Retak", price: 12000 },
      { name: "Basreng Small", price: 11000 },
      { name: "Basreng Big", price: 25000 },
    ],
  },
  {
    category: "Extra Topping",
    items: [
      { name: "Extrashoot Espresso", price: 7000 },
      { name: "Vanilla Ice Cream", price: 5000 },
      { name: "Jelly Coklat", price: 2000 },
      { name: "Oat Milk", price: 7000 },
    ],
  },
];

// Flat list semua menu untuk search/autocomplete
export const ALL_MENU_ITEMS = MENU_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category }))
);
