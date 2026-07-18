"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { OrderActions } from "@/components/order-actions";
import { menuItems } from "@/lib/menu";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

const menuCategories = [...new Set(menuItems.map((coffee) => coffee.category))];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]);
  const selectedItems = menuItems.filter((coffee) => coffee.category === selectedCategory);
  return (
    <div className="brand-page mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid items-center gap-8 lg:grid-cols-[1fr_280px]">
        <div className="max-w-3xl"><p className="eyebrow">The menu</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Crafted. Extracted. Perfected.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#f8efe5]/70">Our complete coffee menu, inspired by the 9 BAR house card and made fresh for delivery in Faisalabad.</p></div>
        <div className="relative hidden aspect-[0.72] overflow-hidden rounded-3xl border border-[#d2a24c]/30 shadow-[0_18px_50px_rgba(0,0,0,0.35)] lg:block"><Image src="/images/brand/9bar-menu-card.jpeg" alt="9 BAR signature menu card" fill sizes="280px" className="object-cover object-top" /></div>
      </motion.div>
      <div className="mt-12 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Menu categories">
        {menuCategories.map((category) => <button key={category} type="button" role="tab" aria-selected={selectedCategory === category} onClick={() => setSelectedCategory(category)} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${selectedCategory === category ? "bg-[#d2a24c] text-[#160f07]" : "border border-white/15 text-[#f8efe5]/75 hover:border-[#d2a24c]/60 hover:text-white"}`}>{category}</button>)}
      </div>
      <motion.section key={selectedCategory} variants={container} initial="hidden" animate="show" className="mt-8 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">{selectedCategory}</h2>
          <span className="text-sm text-[#f8efe5]/55">{selectedItems.length} items</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {selectedItems.map((coffee) => (
                <motion.article variants={item} whileHover={{ y: -7 }} transition={{ duration: 0.25 }} key={coffee.slug} className="group overflow-hidden rounded-[20px] border border-[#c8a46a]/30 bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(246,240,232,0.84))] shadow-[0_18px_38px_rgba(59,42,31,0.12)]">
                  <div className="relative h-40 overflow-hidden bg-[#11141d] sm:h-60">
                    <Image src={coffee.image} alt={coffee.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 33vw" className="object-contain transition-transform duration-700 group-hover:scale-105" />
                    {coffee.bestSeller && <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#d2a24c] px-3 py-1.5 text-xs font-bold text-[#160f07]"><Sparkles size={12} /> Best Seller</span>}
                  </div>
                  <div className="p-6"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow text-[10px]">{coffee.category}</p><h2 className="mt-2 text-xl font-semibold text-white">{coffee.name}</h2></div><span className="shrink-0 text-sm font-semibold text-[#dcb05b]">{coffee.price}</span></div><p className="mt-3 text-sm leading-7 text-[#f8efe5]/65">{coffee.description}</p><div className="mt-5 flex flex-wrap gap-2 text-xs"><span className="rounded-full border border-white/10 px-3 py-1.5 text-[#f8efe5]/70">{coffee.availability}</span>{coffee.seasonal && <span className="rounded-full border border-[#d2a24c]/30 px-3 py-1.5 text-[#dcb05b]">Seasonal</span>}</div><div className="mt-6 flex flex-wrap gap-3"><OrderActions compact drinkName={coffee.name} price={coffee.price} /><Link href={`/drink/${coffee.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#d2a24c]/50 hover:text-[#dcb05b]">Details <ArrowRight size={14} /></Link></div></div>
                </motion.article>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
