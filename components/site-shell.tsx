import Link from "next/link";
import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { siteConfig, orderLinks } from "@/lib/site";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-[#f8efe5]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090807]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="9 BAR home" className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.03]">
            <Image src="/images/logo/logo.svg" alt="9 BAR logo" width={120} height={40} />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-[#f8efe5]/80 transition-colors duration-300 hover:text-[#d2a24c]">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href={orderLinks.phone} className="hidden items-center gap-2 rounded-full border border-[#d2a24c]/40 bg-[#d2a24c]/5 px-4 py-2 text-sm font-semibold text-[#f8efe5] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d2a24c]/15 sm:flex">
            <PhoneCall size={16} />
            Call Us
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 bg-[#080706]/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">9 BAR</p>
            <h3 className="mt-3 text-2xl font-semibold">Luxury coffee, delivered with elegance.</h3>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#f8efe5]/70">{siteConfig.description}</p>
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
              <Link href={orderLinks.whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-[#d2a24c]/40 px-4 py-2 text-sm font-semibold text-[#d2a24c]">WhatsApp</Link>
              <Link href={orderLinks.phone} className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-[#f8efe5]">Call</Link>
              <Link href={orderLinks.foodpanda} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-[#f8efe5]">Foodpanda</Link>
            </div>
            <p className="mt-6 text-sm text-[#f8efe5]/60">© 2026 9 BAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
