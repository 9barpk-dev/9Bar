export const siteConfig = {
  name: "9 BAR",
  tagline: "Premium Cloud Coffee Café",
  country: "Pakistan",
  description:
    "Luxury coffee delivery with WhatsApp, phone, and Foodpanda ordering for premium cloud coffee experiences.",
  url: "https://9bar.example.com",
};

export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";
export const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+92 300 1234567";
export const foodpandaUrl = process.env.NEXT_PUBLIC_FOODPANDA_URL || "https://www.foodpanda.pk/";
export const whatsappMessage =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
  "Hello 9 BAR, I would like to place an order for premium coffee.";

export const orderLinks = {
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  phone: `tel:${phoneNumber.replace(/[^+\d]/g, "")}`,
  foodpanda: foodpandaUrl,
};
