import React, { useState } from "react";
import { Plus, Trash2, ShoppingCart, Search } from "lucide-react";
import { ALL_MENU_ITEMS, MENU_CATEGORIES } from "../data/menu";

export default function MenuPicker({ selectedItems, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Kopi Susu");

  const filteredItems = ALL_MENU_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayItems = searchTerm
    ? filteredItems
    : MENU_CATEGORIES.find((c) => c.category === activeCategory)?.items || [];

  const addItem = (menuItem) => {
    const existing = selectedItems.find((item) => item.name === menuItem.name);
    if (existing) {
      onChange(
        selectedItems.map((item) =>
          item.name === menuItem.name ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      onChange([...selectedItems, { ...menuItem, qty: 1 }]);
    }
  };

  const removeItem = (name) => {
    onChange(selectedItems.filter((item) => item.name !== name));
  };

  const updateQty = (name, qty) => {
    if (qty < 1) {
      removeItem(name);
    } else {
      onChange(selectedItems.map((item) => (item.name === name ? { ...item, qty } : item)));
    }
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = selectedItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AAA6]/30 focus:border-[#00AAA6]"
        />
      </div>

      {/* Category tabs */}
      {!searchTerm && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveCategory(cat.category)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex-shrink-0 ${
                activeCategory === cat.category
                  ? "bg-[#00403C] text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      )}

      {/* Menu grid */}
      <div className="grid grid-cols-2 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
        {displayItems.map((item) => {
          const inCart = selectedItems.find((s) => s.name === item.name);
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => addItem(item)}
              className={`text-left p-2.5 rounded-lg border transition-all ${
                inCart
                  ? "border-[#00AAA6] bg-[#F0FAF9]"
                  : "border-gray-100 bg-gray-50 hover:border-[#00AAA6]/40 hover:bg-[#F0FAF9]/50"
              }`}
            >
              <p className="text-[12px] font-semibold text-[#00403C] leading-tight">{item.name}</p>
              <p className="text-[11px] text-[#00AAA6] font-bold mt-0.5">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
              {inCart && (
                <span className="text-[9px] font-bold bg-[#00AAA6] text-white px-1.5 py-0.5 rounded mt-1 inline-block">
                  {inCart.qty}x
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cart summary */}
      {selectedItems.length > 0 && (
        <div className="border border-[#00AAA6]/20 rounded-xl bg-[#F0FAF9]/50 p-3 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart size={14} className="text-[#00AAA6]" />
            <p className="text-xs font-bold text-[#00403C]">
              Pesanan ({totalItems} item)
            </p>
          </div>
          {selectedItems.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <p className="text-[12px] text-[#525252] flex-1 truncate">{item.name}</p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => updateQty(item.name, item.qty - 1)}
                  className="w-5 h-5 rounded bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center hover:bg-gray-300"
                >
                  −
                </button>
                <span className="text-[12px] font-bold text-[#00403C] w-4 text-center">{item.qty}</span>
                <button
                  type="button"
                  onClick={() => updateQty(item.name, item.qty + 1)}
                  className="w-5 h-5 rounded bg-[#00AAA6] text-white text-xs font-bold flex items-center justify-center hover:bg-[#008f8c]"
                >
                  +
                </button>
              </div>
              <p className="text-[11px] font-bold text-[#00403C] w-16 text-right">
                Rp {(item.price * item.qty / 1000).toFixed(0)}k
              </p>
              <button
                type="button"
                onClick={() => removeItem(item.name)}
                className="text-red-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <div className="border-t border-[#00AAA6]/20 pt-2 flex justify-between items-center">
            <p className="text-xs font-bold text-[#00403C]">Total</p>
            <p className="text-sm font-black text-[#00AAA6]">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
