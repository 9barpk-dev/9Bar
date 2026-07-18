"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { menuItems } from "@/lib/menu";
import { OrderActions } from "@/components/order-actions";

export function MenuCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = menuItems[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % menuItems.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + menuItems.length) % menuItems.length);

  return (
    <section className="on-dark mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-label="Full menu slideshow">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><p className="eyebrow">The full menu</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Something for every coffee mood.</h2></div>
        <Link href="/menu" className="text-sm font-semibold text-[#dcb05b] transition hover:text-white">Browse by category →</Link>
      </div>
      <div className="overflow-hidden rounded-[28px] border border-[#d2a24c]/30 bg-[#11100e]/80 shadow-[0_20px_45px_rgba(0,0,0,0.25)]">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-72 overflow-hidden bg-[#11141d] sm:min-h-96">
            <Image key={activeItem.slug} src={activeItem.image} alt={activeItem.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-6 transition-opacity duration-500" />
            <span className="absolute left-5 top-5 rounded-full bg-[#d2a24c] px-3 py-1.5 text-xs font-bold text-[#160f07]">{activeItem.category}</span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="eyebrow">{String(activeIndex + 1).padStart(2, "0")} / {String(menuItems.length).padStart(2, "0")}</p>
            <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{activeItem.name}</h3>
            <p className="mt-3 text-lg font-semibold text-[#dcb05b]">{activeItem.price}</p>
            <p className="mt-5 max-w-xl leading-7 text-[#f8efe5]/70">{activeItem.description}</p>
            <div className="mt-7"><OrderActions compact drinkName={activeItem.name} price={activeItem.price} /></div>
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex gap-2" aria-label="Menu slideshow controls">
                <button type="button" onClick={() => move(-1)} aria-label="Previous menu item" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#d2a24c] hover:text-[#dcb05b]"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => move(1)} aria-label="Next menu item" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#d2a24c] hover:text-[#dcb05b]"><ChevronRight size={18} /></button>
              </div>
              <Link href={`/drink/${activeItem.slug}`} className="text-sm font-semibold text-[#dcb05b] transition hover:text-white">View details →</Link>
            </div>
            <label className="mt-6 block"><span className="sr-only">Choose a menu item</span><input type="range" min="0" max={menuItems.length - 1} value={activeIndex} onChange={(event) => setActiveIndex(Number(event.target.value))} className="h-2 w-full cursor-pointer accent-[#d2a24c]" aria-label="Choose a menu item" /></label>
          </div>
        </div>
      </div>
    </section>
  );
}
