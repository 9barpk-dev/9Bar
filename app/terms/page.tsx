import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">Terms & Conditions</p>
      <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Terms for ordering from 9 BAR.</h1>
      <Card className="mt-10">
        <CardContent className="space-y-4 text-sm leading-8 text-[#f8efe5]/75">
          <p>By placing an order with 9 BAR, you agree to provide accurate contact details and confirm your order details before submission.</p>
          <p>Prices, availability, and delivery timing may vary depending on your location and current service conditions.</p>
          <p>We reserve the right to update our menu and service terms at any time without prior notice.</p>
        </CardContent>
      </Card>
    </div>
  );
}
