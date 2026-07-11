"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Coffee, MapPin, PackageCheck, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { OrderActions } from "@/components/order-actions";
import { DeliveryAvailabilityChecker } from "@/components/delivery-availability-checker";
import { Card, CardContent } from "@/components/ui/card";
import { bestSellers, featuredItems } from "@/lib/menu";
import { orderLinks, siteConfig } from "@/lib/site";

const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };

const badges = [
  { label: "Freshly Brewed", icon: Coffee },
  { label: "20–30 Min Delivery", icon: Timer },
  { label: "Faisalabad", icon: MapPin },
];

const trustItems = [
  { title: "Premium Beans", text: "Carefully selected for a rich, balanced cup.", icon: Coffee },
  { title: "Hygienic Preparation", text: "Made with meticulous care, every time.", icon: ShieldCheck },
  { title: "Secure Packaging", text: "Sealed to arrive at its absolute best.", icon: PackageCheck },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <Image src="/images/banners/hero-banner.svg" alt="A beautifully prepared coffee from 9 BAR" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,6,5,0.96)_0%,rgba(8,6,5,0.81)_46%,rgba(8,6,5,0.31)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(205,147,57,0.19),transparent_31rem)]" />
        <motion.div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#d2a24c]/15 blur-3xl" animate={{ y: [0, 24, 0], x: [0, -12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <div className="relative mx-auto flex min-h-[calc(100svh-73px)] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
            <motion.p variants={reveal} className="eyebrow mb-5">{siteConfig.tagline}</motion.p>
            <motion.h1 variants={reveal} className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-8xl">
              Coffee worth <span className="gold-shimmer">slowing down</span> for.
            </motion.h1>
            <motion.p variants={reveal} className="mt-7 max-w-xl text-base leading-8 text-[#f8efe5]/80 sm:text-lg">
              Café-level espresso, crafted with intent and delivered to your door. Your daily ritual, elevated.
            </motion.p>
            <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
              <Link href={orderLinks.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#f3cf86]/50 bg-gradient-to-r from-[#c99336] via-[#e4b05d] to-[#c99336] bg-[length:200%_auto] px-6 py-3.5 text-sm font-bold text-[#120c05] shadow-[0_14px_35px_rgba(210,162,76,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[position:right_center]">
                Order Now <ArrowRight size={17} />
              </Link>
              <Link href="/menu" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d2a24c]/60 hover:bg-white/10">
                View Menu
              </Link>
            </motion.div>
            <motion.div variants={reveal} className="mt-10 flex flex-wrap gap-2.5">
              {badges.map(({ label, icon: Icon }) => <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3.5 py-2 text-xs font-medium text-[#f8efe5]/90 backdrop-blur-md"><Icon size={14} className="text-[#dcb05b]" />{label}</span>)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <DeliveryAvailabilityChecker />

      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-4 md:grid-cols-3">
          {trustItems.map(({ title, text, icon: Icon }) => (
            <motion.div variants={reveal} key={title} className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-[#d2a24c]/30 hover:bg-[#d2a24c]/[0.06]">
              <Icon size={21} className="text-[#dcb05b]" />
              <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-[#f8efe5]/65">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Selected for you</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Our signature pours.</h2></div><Link href="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-[#dcb05b] transition hover:gap-3">Browse the full menu <ArrowRight size={16} /></Link></div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredItems.map((item) => (
            <motion.article variants={reveal} whileHover={{ y: -7 }} transition={{ duration: 0.25 }} key={item.slug} className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#11100e]/75 shadow-[0_20px_45px_rgba(0,0,0,0.25)]">
              <div className="relative h-60 overflow-hidden"><Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />{item.bestSeller && <span className="absolute left-4 top-4 rounded-full bg-[#d2a24c] px-3 py-1.5 text-xs font-bold text-[#160f07] shadow-lg">Best Seller</span>}</div>
              <div className="p-6"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-[10px]">{item.category}</p><h3 className="mt-2 text-xl font-semibold text-white">{item.name}</h3></div><span className="shrink-0 text-sm font-semibold text-[#dcb05b]">{item.price}</span></div><p className="mt-3 text-sm leading-7 text-[#f8efe5]/65">{item.description}</p><Link href={`/drink/${item.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#dcb05b] transition hover:gap-3">Discover drink <ArrowRight size={15} /></Link></div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><Card className="border-[#d2a24c]/20"><CardContent><p className="eyebrow">Most loved</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">The regulars’ essentials.</h2><div className="mt-7 space-y-3">{bestSellers.map((item) => <Link href={`/drink/${item.slug}`} key={item.slug} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/15 px-4 py-3.5 transition-all hover:border-[#d2a24c]/35 hover:bg-[#d2a24c]/[0.06]"><span><span className="block font-semibold text-white">{item.name}</span><span className="text-sm text-[#f8efe5]/55">{item.category}</span></span><span className="text-sm font-semibold text-[#dcb05b]">{item.price}</span></Link>)}</div></CardContent></Card>
        <Card className="relative overflow-hidden border-[#d2a24c]/20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(210,162,76,0.18),transparent_18rem)]" /><CardContent className="relative"><p className="eyebrow">The 9 BAR standard</p><h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-[-0.03em] text-white">Thoughtful from bean to doorstep.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Rich, balanced flavour", "Made fresh to order", "Careful, secure handoff", "Simple online ordering"].map((label) => <div key={label} className="flex items-center gap-3 text-sm text-[#f8efe5]/80"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d2a24c]/15 text-[#dcb05b]"><Check size={15} /></span>{label}</div>)}</div><div className="mt-10"><OrderActions /></div></CardContent></Card></div></section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"><Card className="overflow-hidden border-[#d2a24c]/25 bg-[linear-gradient(110deg,rgba(77,48,21,0.72),rgba(17,14,11,0.85))]"><CardContent className="flex flex-col items-start justify-between gap-7 py-10 sm:flex-row sm:items-center"><div><p className="eyebrow">Your next coffee awaits</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">Make this moment exceptional.</h2><p className="mt-3 text-sm text-[#f8efe5]/70">Fresh coffee, delivered in Faisalabad.</p></div><Link href={orderLinks.whatsapp} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#d2a24c] px-6 py-3.5 text-sm font-bold text-[#160f07] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e4b05d]"><Sparkles size={16} /> Start your order</Link></CardContent></Card></section>
    </>
  );
}
