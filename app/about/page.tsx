import { Card, CardContent } from "@/components/ui/card";
import { OrderActions } from "@/components/order-actions";

export default function AboutPage() {
  return (
    <div className="brand-page mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">About</p>
        <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">9 BAR is a premium cloud coffee café built around quality, elegance, and effortless ordering.</h1>
        <p className="mt-5 text-lg leading-8 text-[#f8efe5]/75">We combine luxurious coffee crafting with a refined digital experience, making every order feel personal and premium.</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold text-white">Our philosophy</h2>
            <p className="mt-4 text-sm leading-8 text-[#f8efe5]/70">We believe premium coffee should feel elevated, modern, and effortless. From the first glance at our website to the final sip, every detail is designed with care.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold text-white">How we serve</h2>
            <p className="mt-4 text-sm leading-8 text-[#f8efe5]/70">Our customers can order through WhatsApp, direct phone calls, or Foodpanda. We focus on fast communication and an elegant experience from our cloud café at Eden Garden, Punjab, Faisalabad, Pakistan.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <OrderActions />
      </div>
    </div>
  );
}
