import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrderActions } from "@/components/order-actions";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">The page you are looking for is not available.</h1>
      <p className="mt-5 text-lg leading-8 text-[#f8efe5]/70">Please return to the homepage or place an order directly through WhatsApp, phone, or Foodpanda.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[#d2a24c] px-4 py-2.5 text-sm font-semibold text-[#05070b]">
          <ArrowLeft size={16} />
          Back Home
        </Link>
        <OrderActions />
      </div>
    </div>
  );
}
