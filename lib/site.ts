export const siteConfig = {
  name: "9 BAR",
  tagline: "Where pressure becomes pleasure",
  country: "Pakistan",
  description: "Freshly crafted specialty coffee, delivered across Faisalabad.",
  url: "https://9-bar-zkoh.vercel.app",
  instagramHandle: "@9bar.pak",
  instagramUrl: "https://www.instagram.com/9bar.pak/",
  deliveryArea: "Faisalabad",
  deliveryTime: "20–30 min delivery",
  hours: "Open daily · 12 PM – 12 AM",
  paymentNote: "Cash & bank transfer accepted",
};

export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923205950705";
export const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+92 320 5950705";
export const foodpandaUrl = process.env.NEXT_PUBLIC_FOODPANDA_URL || "https://www.foodpanda.pk/";
export const whatsappMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hello 9 BAR, I would like to place an order for premium coffee.";

export const orderLinks = {
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  phone: `tel:${phoneNumber.replace(/[^+\d]/g, "")}`,
  foodpanda: foodpandaUrl,
};

export const isFoodpandaAvailable = foodpandaUrl !== "https://www.foodpanda.pk/";

export function whatsappOrderLink(drink?: string) {
  const message = drink ? `Hello 9 BAR, I would like to order ${drink}.` : whatsappMessage;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
