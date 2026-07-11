import Link from "next/link";
import { MessageCircleMore, PhoneCall, ShoppingBag } from "lucide-react";
import { orderLinks } from "@/lib/site";

export function OrderActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex flex-wrap gap-3" : "flex flex-wrap gap-3 sm:gap-4"}>
      <Link
        href={orderLinks.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[#f3cf86]/50 bg-gradient-to-r from-[#c99336] via-[#e4b05d] to-[#c99336] bg-[length:200%_auto] px-5 py-3 text-sm font-bold text-[#120c05] shadow-[0_12px_30px_rgba(210,162,76,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[position:right_center] hover:shadow-[0_16px_38px_rgba(210,162,76,0.28)]"
      >
        <MessageCircleMore size={16} />
        WhatsApp Order
      </Link>
      <Link
        href={orderLinks.phone}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-[#f8efe5] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d2a24c]/50 hover:bg-white/10"
      >
        <PhoneCall size={16} />
        Call Now
      </Link>
      <Link
        href={orderLinks.foodpanda}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[#f8efe5]/20 bg-[#11141d]/80 px-5 py-3 text-sm font-semibold text-[#f8efe5] transition-all duration-300 hover:-translate-y-1 hover:border-[#d2a24c] hover:text-[#d2a24c]"
      >
        <ShoppingBag size={16} />
        Foodpanda
      </Link>
    </div>
  );
}
