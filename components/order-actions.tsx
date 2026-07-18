"use client";

import { ShoppingBag } from "lucide-react";
import { useOrderCart } from "@/components/order-drawer";

export function OrderActions({ compact = false, drinkName, price }: { compact?: boolean; drinkName?: string; price?: string }) {
  const { addItem, openCart } = useOrderCart();
  return (
    <div className={compact ? "flex flex-wrap gap-3" : "flex flex-wrap gap-3 sm:gap-4"}>
      <button
        type="button"
        onClick={() => drinkName && price ? addItem(drinkName, price) : openCart()}
        className="inline-flex items-center gap-2 rounded-full border border-[#c8a46a]/60 bg-gradient-to-r from-[#8b6a3d] via-[#c8a46a] to-[#8b6a3d] bg-[length:200%_auto] px-5 py-3 text-sm font-bold text-[#fffaf3] shadow-[0_12px_30px_rgba(139,106,61,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[position:right_center] hover:shadow-[0_16px_38px_rgba(139,106,61,0.3)]"
      >
        <ShoppingBag size={16} />
        {drinkName ? "Add to cart" : "Open cart"}
      </button>
    </div>
  );
}
