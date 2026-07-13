export type MenuItem = { slug: string; name: string; price: string; description: string; image: string; category: string; availability: "In Stock" | "Limited"; featured?: boolean; bestSeller?: boolean; seasonal?: boolean; };

const item = (slug: string, name: string, price: string, description: string, image: string, category: string, options: Partial<MenuItem> = {}): MenuItem => ({ slug, name, price, description, image, category, availability: "In Stock", ...options });

export const menuItems: MenuItem[] = [
  item("hot-americano", "Hot Americano", "Rs 599", "A bold double shot of espresso, smoothed with perfectly heated water.", "/images/coffee/hot-americano.jpg.png", "Americano"),
  item("iced-americano", "Iced Americano", "Rs 599", "Double espresso poured over ice and chilled water for a refreshing kick.", "/images/coffee/americano.png", "Americano"),
  item("long-black", "Long Black", "Rs 599", "A double espresso extracted directly over hot water to preserve a rich crema.", "/images/coffee/americano.png", "Long Black"),
  item("classic-hot-latte", "Classic Hot Latte", "Rs 899", "Freshly pulled espresso balanced with perfectly textured steamed milk.", "/images/coffee/classic-hot-latte.jpg.png", "Hot", { featured: true }),
  item("hot-spanish-latte", "Hot Spanish Latte", "Rs 849", "Espresso and steamed milk enriched with a comforting layer of sweet condensed milk.", "/images/coffee/hot-spanish-latte.jpg.png", "Hot", { bestSeller: true }),
  item("hot-hazelnut-latte", "Hot Hazelnut Latte", "Rs 899", "Fresh espresso and steamed milk, sweetened with premium hazelnut flavour.", "/images/coffee/hot-hazelnut-latte.jpg.png", "Hot"),
  item("hot-caramel-latte", "Hot Caramel Latte", "Rs 899", "Espresso and steamed milk finished with sweet ribbons of rich caramel.", "/images/coffee/hot-caramel-latte.jpg.png", "Hot"),
  item("hot-vanilla-latte", "Hot Vanilla Latte", "Rs 899", "Fresh espresso and steamed milk softened with sweet vanilla.", "/images/coffee/hot-vanilla-latte.jpg.png", "Hot"),
  item("hot-mocha", "Hot Mocha", "Rs 899", "Espresso, steamed milk, and dark chocolate for a rich warming finish.", "/images/coffee/hot-mocha.jpg.png", "Hot"),
  item("iced-spanish-latte", "Iced Spanish Latte", "Rs 899", "Our classic espresso poured over ice, milk, and thick condensed milk.", "/images/coffee/iced-spanish-latte.png", "Iced Latte", { featured: true, bestSeller: true }),
  item("iced-hazelnut-latte", "Iced Hazelnut Latte", "Rs 1099", "Chilled espresso and milk, perfectly sweetened with premium hazelnut.", "/images/coffee/iced-hazelnut-latte.jpg.png", "Iced Latte"),
  item("iced-caramel-latte", "Iced Caramel Latte", "Rs 1099", "Chilled espresso and milk finished with rich Monin caramel.", "/images/coffee/iced-caramel-latte.jpg.png", "Iced Latte"),
  item("iced-vanilla-latte", "Iced Vanilla Latte", "Rs 1099", "Chilled espresso and milk softened with sweet Monin vanilla.", "/images/coffee/iced-vanilla-latte.jpg.png", "Iced Latte"),
  item("iced-mocha", "Iced Mocha", "Rs 1099", "Chilled espresso, milk, and dark chocolate for a rich finish.", "/images/coffee/iced-mocha.jpg.png", "Iced Latte"),
  item("hazelnut-frappe", "Hazelnut Frappe", "Rs 1199", "Smooth ice-blended coffee, finished with premium roasted hazelnut.", "/images/coffee/hazelnut-frappe.jpg.png", "Frappes", { featured: true, bestSeller: true }),
  item("caramel-frappe", "Caramel Frappe", "Rs 1199", "An ice-blended coffee treat finished with rich caramel sauce.", "/images/coffee/caramel-frappe.jpg.png", "Frappes"),
  item("vanilla-frappe", "Vanilla Frappe", "Rs 1199", "Smooth ice-blended coffee sweetened with classic vanilla.", "/images/coffee/vanilla-frappe.jpg.png", "Frappes"),
  item("mocha-frappe", "Mocha Frappe", "Rs 1199", "Ice-blended coffee rich with dark chocolate flavour.", "/images/coffee/mocha-frappe.jpg.png", "Frappes"),
];

export const featuredItems = menuItems.filter((entry) => entry.featured);
export const bestSellers = menuItems.filter((entry) => entry.bestSeller);
export function getMenuItemBySlug(slug: string) { return menuItems.find((entry) => entry.slug === slug); }
