import { Card, CardContent } from "@/components/ui/card";
import { OrderActions } from "@/components/order-actions";

const faqData = [
  { question: "Do you have a physical café location?", answer: "No. 9 BAR operates as a premium cloud coffee café from Eden Garden, Punjab, Faisalabad. All orders are prepared fresh for delivery and pickup." },
  { question: "Can I order by WhatsApp?", answer: "Yes. The website includes a direct WhatsApp order button with a ready-made message template." },
  { question: "Do you offer food delivery through Foodpanda?", answer: "Yes. A dedicated Foodpanda button is provided so you can easily update the link later." },
  { question: "Can I change pricing easily?", answer: "Yes. All drink details are kept in a single menu file so updates are simple and fast." },
];

export default function FAQPage() {
  return (
    <div className="brand-page mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">FAQ</p>
        <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Common questions about 9 BAR and how we work.</h1>
      </div>

      <div className="mt-12 space-y-4">
        {faqData.map((item) => (
          <Card key={item.question}>
            <CardContent>
              <h2 className="text-xl font-semibold text-white">{item.question}</h2>
              <p className="mt-3 text-sm leading-8 text-[#f8efe5]/70">{item.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <OrderActions />
      </div>
    </div>
  );
}
