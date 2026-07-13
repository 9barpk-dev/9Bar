"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Menu, PhoneCall, X } from "lucide-react";
import { siteConfig, orderLinks } from "@/lib/site";
import { CartButton } from "@/components/order-drawer";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen text-[#3b2a1f]">
      <div className="bg-[#3b2a1f] px-4 py-2 text-center text-xs font-semibold tracking-wide text-[#f8efe5] sm:text-sm">🚚 FREE Delivery on orders above Rs. 2,000 (within 5 km) <span className="mx-1.5 text-[#d2a24c]">•</span> ☕ Freshly Brewed <span className="mx-1.5 text-[#d2a24c]">•</span> Delivered Fast <span className="mx-1.5 text-[#d2a24c]">•</span> Premium Coffee.</div>
      <header className="sticky top-0 z-40 border-b border-[#c8a46a]/20 bg-[#f6f0e8]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="9 BAR home" className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.03]">
            <span className="relative h-10 w-10 overflow-hidden rounded-full border border-[#d2a24c]/50 bg-[#e8d7bd] shadow-[0_0_18px_rgba(210,162,76,0.2)]"><Image src="/images/brand/9bar-brand-art.png" alt="9 BAR coffee mark" fill sizes="40px" className="object-cover object-[50%_31%] scale-[1.75]" /></span>
            <span className="font-serif text-lg font-semibold tracking-[0.2em] text-[#3b2a1f]">9 BAR</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-[#3b2a1f]/75 transition-colors duration-300 hover:text-[#8b6a3d]">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2"><Link href={orderLinks.phone} className="hidden items-center gap-2 rounded-full border border-[#c8a46a]/50 bg-white/55 px-4 py-2 text-sm font-semibold text-[#3b2a1f] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c8a46a]/15 sm:flex">
            <PhoneCall size={16} />
            Call Us
          </Link><CartButton /><button type="button" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Toggle navigation menu" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a46a]/45 bg-white/60 md:hidden">{mobileOpen ? <X size={19} /> : <Menu size={20} />}</button></div>
        </div>
        {mobileOpen && <nav className="border-t border-[#c8a46a]/20 bg-[#fffaf3] px-4 py-4 md:hidden"><div className="mx-auto grid max-w-7xl gap-1">{navItems.map((item) => <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-[#efe3d1]">{item.label}</Link>)}</div></nav>}
      </header>

      <main>{children}</main>

      <footer className="border-t border-[#8b6a3d]/30 bg-[#3b2a1f] text-[#f6f0e8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">9 BAR</p>
            <h3 className="mt-3 text-2xl font-semibold">Luxury coffee, delivered with elegance.</h3>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#f8efe5]/70">{siteConfig.description}</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#f8efe5]/70">Based at Eden Garden, Punjab, Faisalabad, Pakistan — a premium cloud café dedicated to fresh delivery.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-[#f8efe5]/70">
              {navItems.map((item) => (
                <li key={item.href}><Link href={item.href} className="transition hover:text-[#d2a24c]">{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Order Today</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={orderLinks.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#d2a24c]/40 px-4 py-2 text-sm font-semibold text-[#d2a24c]"><Image src="/whatsapp.png" alt="WhatsApp" width={16} height={16} />WhatsApp</Link>
              <Link href={orderLinks.phone} className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-[#f8efe5]">Call</Link>
              <Link href={orderLinks.foodpanda} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-[#f8efe5]"><Image src="/icons8-foodpanda-48.png" alt="Foodpanda" width={16} height={16} />Foodpanda</Link>
              <Link href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-[#f8efe5] transition hover:border-[#d2a24c]/50 hover:text-[#d2a24c]"><Instagram size={15} />{siteConfig.instagramHandle}</Link>
            </div>
            <p className="mt-6 text-sm text-[#f8efe5]/60">© 2026 9 BAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-3 bottom-3 z-50 flex gap-2 rounded-2xl border border-[#c8a46a]/35 bg-[#3b2a1f]/95 p-2 shadow-2xl backdrop-blur-xl sm:hidden">
        <Link href="/menu" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8b6a3d] via-[#c8a46a] to-[#8b6a3d] px-3 py-3 text-sm font-bold text-[#fffaf3]">Start your order</Link>
        <Link href={orderLinks.phone} aria-label="Call 9 BAR" className="flex w-12 items-center justify-center rounded-xl border border-[#c8a46a]/35 text-[#f6f0e8]"><PhoneCall size={18} /></Link>
      </div>
    </div>
  );
}
