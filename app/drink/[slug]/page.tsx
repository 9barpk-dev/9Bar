import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderActions } from "@/components/order-actions";
import { Card, CardContent } from "@/components/ui/card";
import { getMenuItemBySlug, menuItems } from "@/lib/menu";

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export default async function DrinkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Card className="overflow-hidden border-[#d2a24c]/20">
          <div className="relative h-[420px]">
            <Image src={item.image} alt={item.name} fill className="object-cover" />
          </div>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">Drink Details</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{item.name}</h1>
            <p className="mt-4 text-lg leading-8 text-[#f8efe5]/75">{item.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#f8efe5]/70">{item.category}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#f8efe5]/70">{item.availability}</span>
              {item.featured && <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#f8efe5]/70">Featured</span>}
              {item.bestSeller && <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#f8efe5]/70">Best Seller</span>}
              {item.seasonal && <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#f8efe5]/70">Seasonal</span>}
            </div>
            <div className="mt-8 flex items-center justify-between rounded-3xl border border-[#d2a24c]/20 bg-[#d2a24c]/10 px-5 py-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#d2a24c]">Price</p>
                <p className="mt-2 text-3xl font-semibold text-white">{item.price}</p>
              </div>
              <Link href="/menu" className="text-sm font-semibold text-[#d2a24c]">Back to menu</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <OrderActions />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
