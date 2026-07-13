import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { OrderCartProvider } from "@/components/order-drawer";

export const metadata: Metadata = {
  title: "9 BAR | Premium Coffee Delivery",
  description: "Premium coffee, freshly crafted and delivered across Faisalabad.",
  icons: { icon: "/images/brand/9bar-brand-art.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><OrderCartProvider><SiteShell>{children}</SiteShell></OrderCartProvider></body>
    </html>
  );
}
