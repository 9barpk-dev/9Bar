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
        className="inline-flex items-center gap-2 rounded-full border border-[#d2a24c]/40 bg-[#d2a24c] px-4 py-2.5 text-sm font-semibold text-[#05070b] transition hover:bg-[#e4b05d]"
      >
        <MessageCircleMore size={16} />
        WhatsApp Order
      </Link>
      <Link
        href={orderLinks.phone}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#f8efe5] transition hover:bg-white/10"
      >
        <PhoneCall size={16} />
        Call Now
      </Link>
      <Link
        href={orderLinks.foodpanda}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[#f8efe5]/20 bg-[#11141d] px-4 py-2.5 text-sm font-semibold text-[#f8efe5] transition hover:border-[#d2a24c] hover:text-[#d2a24c]"
      >
        <ShoppingBag size={16} />
        Foodpanda
      </Link>
    </div>
  );
}
