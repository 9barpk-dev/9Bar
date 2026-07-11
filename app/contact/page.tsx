import { Card, CardContent } from "@/components/ui/card";
import { OrderActions } from "@/components/order-actions";
import { phoneNumber, whatsappNumber } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Reach 9 BAR for premium coffee orders and quick assistance.</h1>
        <p className="mt-5 text-lg leading-8 text-[#f8efe5]/75">Whether you prefer WhatsApp, a direct phone call, or Foodpanda, we make ordering effortless.</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold text-white">Order directly</h2>
            <div className="mt-5 space-y-3 text-sm text-[#f8efe5]/70">
              <p>WhatsApp: {whatsappNumber}</p>
              <p>Phone: {phoneNumber}</p>
              <p>Foodpanda: Order from our dedicated link</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <OrderActions />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold text-white">Operating style</h2>
            <p className="mt-4 text-sm leading-8 text-[#f8efe5]/70">We operate as a premium cloud coffee café, which means every order is handled online with care, style, and exceptional service.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
