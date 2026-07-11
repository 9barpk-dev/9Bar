import Image from "next/image";
import Link from "next/link";
import { OrderActions } from "@/components/order-actions";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems } from "@/lib/menu";

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">Menu</p>
        <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Signature coffees crafted for a polished daily ritual.</h1>
        <p className="mt-5 text-lg leading-8 text-[#f8efe5]/75">Browse the menu below and order with WhatsApp, phone, or Foodpanda in seconds.</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.slug} className="overflow-hidden">
            <div className="relative h-56">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <CardContent>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#d2a24c]">{item.category}</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">{item.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#f8efe5]/70">{item.description}</p>
                </div>
                <div className="rounded-full border border-[#d2a24c]/30 px-3 py-1 text-sm text-[#d2a24c]">{item.price}</div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#f8efe5]/70">
                <span className="rounded-full border border-white/10 px-3 py-1">{item.availability}</span>
                {item.featured && <span className="rounded-full border border-white/10 px-3 py-1">Featured</span>}
                {item.bestSeller && <span className="rounded-full border border-white/10 px-3 py-1">Best Seller</span>}
                {item.seasonal && <span className="rounded-full border border-white/10 px-3 py-1">Seasonal</span>}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <OrderActions compact />
                <Link href={`/drink/${item.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-[#f8efe5] transition hover:border-[#d2a24c] hover:text-[#d2a24c]">View Details</Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
