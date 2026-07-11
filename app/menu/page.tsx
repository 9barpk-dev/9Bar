"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { OrderActions } from "@/components/order-actions";
import { menuItems } from "@/lib/menu";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
        <p className="eyebrow">The menu</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Designed around the perfect pour.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#f8efe5]/70">A concise collection of polished coffee classics, made fresh for delivery in Faisalabad.</p>
      </motion.div>
      <motion.div variants={container} initial="hidden" animate="show" className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {menuItems.map((coffee) => (
          <motion.article variants={item} whileHover={{ y: -7 }} transition={{ duration: 0.25 }} key={coffee.slug} className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#11100e]/75 shadow-[0_20px_45px_rgba(0,0,0,0.25)]">
            <div className="relative h-60 overflow-hidden"><Image src={coffee.image} alt={coffee.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />{coffee.bestSeller && <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#d2a24c] px-3 py-1.5 text-xs font-bold text-[#160f07]"><Sparkles size={12} /> Best Seller</span>}</div>
            <div className="p-6"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow text-[10px]">{coffee.category}</p><h2 className="mt-2 text-xl font-semibold text-white">{coffee.name}</h2></div><span className="shrink-0 text-sm font-semibold text-[#dcb05b]">{coffee.price}</span></div><p className="mt-3 text-sm leading-7 text-[#f8efe5]/65">{coffee.description}</p><div className="mt-5 flex flex-wrap gap-2 text-xs"><span className="rounded-full border border-white/10 px-3 py-1.5 text-[#f8efe5]/70">{coffee.availability}</span>{coffee.seasonal && <span className="rounded-full border border-[#d2a24c]/30 px-3 py-1.5 text-[#dcb05b]">Seasonal</span>}</div><div className="mt-6 flex flex-wrap gap-3"><OrderActions compact /><Link href={`/drink/${coffee.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#d2a24c]/50 hover:text-[#dcb05b]">Details <ArrowRight size={14} /></Link></div></div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
