import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="brand-page mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.35em] text-[#d2a24c]">Privacy Policy</p>
      <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Your privacy matters to us.</h1>
      <Card className="mt-10">
        <CardContent className="space-y-4 text-sm leading-8 text-[#f8efe5]/75">
          <p>9 BAR respects your privacy and handles your information responsibly. We collect only the information needed to process orders and respond to inquiries.</p>
          <p>We use your information for order coordination, delivery communication, and service support. We do not sell your personal information to third parties.</p>
          <p>If you have questions about this policy, please contact us through the contact page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
