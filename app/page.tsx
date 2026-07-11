"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Clock3, Sparkles, Star, Truck } from "lucide-react";
import { OrderActions } from "@/components/order-actions";
import { Card, CardContent } from "@/components/ui/card";
import { bestSellers, featuredItems } from "@/lib/menu";
import { siteConfig, orderLinks } from "@/lib/site";

const highlights = [
  { title: "Luxury Craft", text: "Hand-finished coffee with rich crema and premium flavor layers." },
  { title: "Fast Delivery", text: "Quick dispatch for local orders with a polished, effortless experience." },
  { title: "Elegant Service", text: "Order via WhatsApp, phone, or Foodpanda with clear, premium guidance." },
];

const reviews = [
  { name: "Ava S.", quote: "The experience feels indulgent from first sip to final delivery." },
  { name: "Muneeb R.", quote: "Beautiful presentation, effortless ordering, and exceptional coffee." },
];

const faqItems = [
  { question: "Do you offer delivery?", answer: "Yes. We provide a premium delivery experience with fast handoff and easy ordering." },
  { question: "Can I order through WhatsApp?", answer: "Absolutely. We support WhatsApp ordering with a ready-made message template." },
  { question: "Is there a physical café?", answer: "No. We operate as a premium cloud coffee café focused on delivery and online ordering." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Image src="/images/banners/hero-banner.svg" alt="Luxury coffee background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,162,76,0.18),transparent_40%),linear-gradient(90deg,rgba(5,7,11,0.96),rgba(5,7,11,0.72))]" />
        <div className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#d2a24c]">{siteConfig.tagline}</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
              Premium cloud coffee, designed for your daily ritual.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f8efe5]/80">
              From velvet espresso to golden cappuccino, 9 BAR brings a luxury café experience straight to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <OrderActions />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#f8efe5]/70">
              <span className="rounded-full border border-white/10 px-3 py-1">Fast ordering</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Premium quality</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Pakistan delivery</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Card className="overflow-hidden border-[#d2a24c]/20 bg-[#0e121a]/90 p-0">
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#d2a24c]">Featured today</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Velvet Espresso</h2>
                  </div>
                  <div className="rounded-full border border-[#d2a24c]/30 px-3 py-1 text-sm text-[#d2a24c]">Best Seller</div>
                </div>
                <div className="relative h-64 overflow-hidden rounded-[24px] border border-white/10 bg-[#05070b]">
                  <Image src="/images/coffee/velvet-espresso.svg" alt="Velvet Espresso" fill className="object-cover" />
                </div>
                <p className="text-sm leading-7 text-[#f8efe5]/70">Deep caramel notes, silky texture, and a luxurious finish for a truly elevated coffee ritual.</p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-3xl font-semibold text-white">PKR 650</p>
                    <p className="text-sm text-[#f8efe5]/60">Available now</p>
                  </div>
                  <Link href="/drink/velvet-espresso" className="inline-flex items-center gap-2 rounded-full border border-[#d2a24c]/50 px-4 py-2.5 text-sm font-semibold text-[#d2a24c] transition hover:bg-[#d2a24c]/10">
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardContent>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d2a24c]/15 text-[#d2a24c]">
                  <Sparkles size={20} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#f8efe5]/70">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#d2a24c]">Featured drinks</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">A curated selection of premium favorites</h2>
          </div>
          <Link href="/menu" className="text-sm font-semibold text-[#d2a24c]">Browse the full menu →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredItems.map((item) => (
            <Card key={item.slug} className="overflow-hidden">
              <div className="relative h-56">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#f8efe5]/70">{item.description}</p>
                  </div>
                  <span className="rounded-full border border-[#d2a24c]/30 px-3 py-1 text-sm text-[#d2a24c]">{item.price}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <OrderActions compact />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="bg-[#0b0f17]/90">
            <CardContent>
              <p className="text-sm uppercase tracking-[0.3em] text-[#d2a24c]">Best sellers</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">The drinks our guests order again and again</h2>
              <div className="mt-6 space-y-4">
                {bestSellers.map((item) => (
                  <div key={item.slug} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-[#f8efe5]/70">{item.category}</p>
                    </div>
                    <div className="text-[#d2a24c]">{item.price}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0b0f17]/90">
            <CardContent>
              <p className="text-sm uppercase tracking-[0.3em] text-[#d2a24c]">Why choose us</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Coffee className="text-[#d2a24c]" />
                  <h3 className="mt-3 text-lg font-semibold text-white">Crafted flavor</h3>
                  <p className="mt-2 text-sm leading-7 text-[#f8efe5]/70">Layered coffee profiles with premium balance and refined finish.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Truck className="text-[#d2a24c]" />
                  <h3 className="mt-3 text-lg font-semibold text-white">Reliable delivery</h3>
                  <p className="mt-2 text-sm leading-7 text-[#f8efe5]/70">We prioritize comfort and speed so you can enjoy your order effortlessly.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Clock3 className="text-[#d2a24c]" />
                  <h3 className="mt-3 text-lg font-semibold text-white">Quick response</h3>
                  <p className="mt-2 text-sm leading-7 text-[#f8efe5]/70">Direct WhatsApp and phone ordering make every purchase easy.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Star className="text-[#d2a24c]" />
                  <h3 className="mt-3 text-lg font-semibold text-white">Exclusive service</h3>
                  <p className="mt-2 text-sm leading-7 text-[#f8efe5]/70">Every order feels polished, premium, and thoughtfully delivered.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-[#0b0f17]/90">
            <CardContent>
              <p className="text-sm uppercase tracking-[0.3em] text-[#d2a24c]">Delivery info</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Luxury coffee delivered with clarity and care</h2>
              <p className="mt-4 text-sm leading-8 text-[#f8efe5]/70">Whether you prefer WhatsApp, a direct phone call, or the convenience of Foodpanda, 9 BAR keeps every order simple and premium.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={orderLinks.whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-[#d2a24c] px-4 py-2.5 text-sm font-semibold text-[#05070b]">Order on WhatsApp</Link>
                <Link href={orderLinks.phone} className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-[#f8efe5]">Call Now</Link>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#0b0f17]/90">
            <CardContent>
              <p className="text-sm uppercase tracking-[0.3em] text-[#d2a24c]">Customer reviews</p>
              <div className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <div key={review.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm leading-7 text-[#f8efe5]/80">“{review.quote}”</p>
                    <p className="mt-3 text-sm font-semibold text-[#d2a24c]">{review.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-[#d2a24c]/20 bg-[#0b0f17]/90">
          <CardContent className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#d2a24c]">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Bring the luxury café experience to your next order.</h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-[#f8efe5]/70">Reach us by WhatsApp, a direct phone call, or through Foodpanda for a seamless premium coffee experience.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <OrderActions />
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
