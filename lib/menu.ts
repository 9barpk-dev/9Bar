export type MenuItem = {
  slug: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
  availability: "In Stock" | "Limited";
  featured?: boolean;
  bestSeller?: boolean;
  seasonal?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    slug: "velvet-espresso",
    name: "Velvet Espresso",
    price: "PKR 650",
    description: "A rich, velvety espresso with caramel depth and a silky crema finish.",
    image: "/images/coffee/velvet-espresso.svg",
    category: "Coffee",
    availability: "In Stock",
    featured: true,
    bestSeller: true,
  },
  {
    slug: "sunset-frappe",
    name: "Sunset Frappe",
    price: "PKR 750",
    description: "Creamy frappe with cocoa, cold foam, and a candy-like finish.",
    image: "/images/frappe/sunset-frappe.svg",
    category: "Frappe",
    availability: "In Stock",
    featured: true,
  },
  {
    slug: "amber-americano",
    name: "Amber Americano",
    price: "PKR 590",
    description: "Bright black coffee with a smooth amber profile and refined finish.",
    image: "/images/americano/amber-americano.svg",
    category: "Americano",
    availability: "In Stock",
    bestSeller: true,
  },
  {
    slug: "royal-latte",
    name: "Royal Latte",
    price: "PKR 700",
    description: "Silky steamed milk layered with bold espresso and a soft vanilla note.",
    image: "/images/latte/royal-latte.svg",
    category: "Latte",
    availability: "Limited",
    featured: true,
    seasonal: true,
  },
  {
    slug: "cloud-mocha",
    name: "Cloud Mocha",
    price: "PKR 720",
    description: "Chocolate-rich mocha topped with airy foam and a velvet finish.",
    image: "/images/coffee/cloud-mocha.svg",
    category: "Coffee",
    availability: "In Stock",
    bestSeller: true,
  },
  {
    slug: "golden-cappuccino",
    name: "Golden Cappuccino",
    price: "PKR 680",
    description: "A polished cappuccino with deep espresso and a golden crema crown.",
    image: "/images/coffee/golden-cappuccino.svg",
    category: "Coffee",
    availability: "In Stock",
    featured: true,
  },
];

export const featuredItems = menuItems.filter((item) => item.featured);
export const bestSellers = menuItems.filter((item) => item.bestSeller);

export function getMenuItemBySlug(slug: string) {
  return menuItems.find((item) => item.slug === slug);
}
