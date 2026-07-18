"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LocateFixed, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { foodpandaUrl, whatsappNumber } from "@/lib/site";
import { deliveryFeeText } from "@/lib/delivery";

type CartItem = { name: string; price: number; quantity: number };
type SavedCustomer = { name: string; phone: string; address: string; orderCount: number };
type CartContextValue = { addItem: (name: string, price: string) => void; openCart: () => void; count: number };
const CartContext = createContext<CartContextValue | null>(null);
const customersStorageKey = "9bar-customers";

function phoneKey(phone: string) { return phone.replace(/\D/g, ""); }
function readCustomers(): Record<string, SavedCustomer> {
  try { return JSON.parse(localStorage.getItem(customersStorageKey) ?? "{}"); } catch { return {}; }
}

function numericPrice(price: string) { return Number(price.replace(/[^0-9]/g, "")); }
export function useOrderCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useOrderCart must be used within OrderCartProvider");
  return context;
}

export function OrderCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const addItem = useCallback((name: string, price: string) => {
    const amount = numericPrice(price);
    setItems((current) => {
      const existing = current.find((item) => item.name === name);
      return existing ? current.map((item) => item.name === name ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { name, price: amount, quantity: 1 }];
    });
    setAddedItem(name);
  }, []);
  useEffect(() => {
    if (!addedItem) return;
    const timeout = window.setTimeout(() => setAddedItem(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [addedItem]);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return <CartContext.Provider value={{ addItem, openCart: () => setIsOpen(true), count }}><OrderDrawer items={items} setItems={setItems} isOpen={isOpen} close={() => setIsOpen(false)} />{children}{addedItem && <div role="status" className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-[#3b2a1f] px-5 py-3 text-sm font-semibold text-[#fffaf3] shadow-xl">Added to cart successfully: {addedItem}</div>}</CartContext.Provider>;
}

export function CartButton() {
  const { count, openCart } = useOrderCart();
  return <button type="button" onClick={openCart} aria-label={`Open order bag with ${count} items`} className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a46a]/45 bg-white/60 text-[#3b2a1f] transition hover:bg-[#c8a46a]/15"><ShoppingBag size={18} />{count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8b6a3d] px-1 text-[10px] font-bold text-white">{count}</span>}</button>;
}

function OrderDrawer({ items, setItems, isOpen, close }: { items: CartItem[]; setItems: React.Dispatch<React.SetStateAction<CartItem[]>>; isOpen: boolean; close: () => void }) {
  const [method, setMethod] = useState<"direct" | "foodpanda">("foodpanda");
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal;
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneLocal, setCustomerPhoneLocal] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const updateQuantity = (name: string, change: number) => setItems((current) => current.flatMap((item) => item.name !== name ? [item] : item.quantity + change > 0 ? [{ ...item, quantity: item.quantity + change }] : []));
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Live location is not supported in this browser.");
      return;
    }
    setIsLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCustomerAddress(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`);
      setLocationAccuracy(Math.round(coords.accuracy));
      setLocationConfirmed(false);
      setMissingFields((current) => current.filter((field) => field !== "location"));
      setIsLocating(false);
    }, () => {
      setLocationError("We could not get your location. Please allow location access and try again.");
      setIsLocating(false);
    }, { enableHighAccuracy: true, timeout: 10000 });
  };
  const checkout = () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    if (!items.length) return;
    const missing = [!customerName.trim() && "name", !customerPhoneLocal.trim() && "phone", (!customerAddress || !locationConfirmed) && "location"].filter(Boolean) as string[];
    if (missing.length) {
      setMissingFields(missing);
      setIsCheckingOut(false);
      return;
    }
    setMissingFields([]);
    const order = items.map((item) => `${item.quantity}× ${item.name}`).join(", ");
    const customerPhoneKey = phoneKey(customerPhoneLocal);
    let orderNumber: number | null = null;
    try {
      const customers = readCustomers();
      const previousCustomer = customerPhoneKey ? customers[customerPhoneKey] : undefined;
      orderNumber = customerPhoneKey ? (previousCustomer?.orderCount ?? 0) + 1 : null;

      if (customerPhoneKey && orderNumber) {
        customers[customerPhoneKey] = {
          name: customerName || previousCustomer?.name || "",
          phone: customerPhoneLocal,
          address: customerAddress || previousCustomer?.address || "",
          orderCount: orderNumber,
        };
        localStorage.setItem(customersStorageKey, JSON.stringify(customers));
      }

      // Keep the most recent details for automatic form filling on the next visit.
      if (customerName) localStorage.setItem("customerName", customerName);
      if (customerPhoneLocal) localStorage.setItem("customerPhone", customerPhoneLocal);
      if (customerAddress) localStorage.setItem("customerAddress", customerAddress);
    } catch {
      /* ignore storage errors */
    }

    const customerInfo = `Name: ${customerName || "(not provided)"}\nPhone: ${customerPhoneLocal || "(not provided)"}\nAddress: ${customerAddress || "(not provided)"}\n\n`;

    const customerStatus = orderNumber ? `Customer record: ${orderNumber === 1 ? "New customer" : "Returning customer"} — order #${orderNumber}\n\n` : "Customer record: Not tracked (phone not provided)\n\n";
    const message = `Hello 9 BAR, I would like to place an order.\n\n${customerInfo}${customerStatus}Order: ${order}\nTotal: Rs. ${total}\n\nDelivery fee: ${deliveryFeeText}\n\nPlease confirm my delivery address and delivery fee.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setItems([]);
    close();
    setIsCheckingOut(false);
  };

  useEffect(() => {
    const loadSavedCustomer = () => {
      try {
        setCustomerName(localStorage.getItem("customerName") ?? "");
        setCustomerPhoneLocal(localStorage.getItem("customerPhone") ?? "");
        setCustomerAddress(localStorage.getItem("customerAddress") ?? "");
      } catch {
        /* ignore storage errors */
      }
    };
    const frame = requestAnimationFrame(loadSavedCustomer);
    return () => cancelAnimationFrame(frame);
  }, []);

  const fillSavedCustomer = () => {
    const savedCustomer = readCustomers()[phoneKey(customerPhoneLocal)];
    if (!savedCustomer) return;
    setCustomerName(savedCustomer.name);
    setCustomerAddress(savedCustomer.address);
  };

  return <>{isOpen && <div className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm" onClick={close} />}
    <aside aria-label="Your order" className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-xl flex-col bg-[#fffaf3] shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-[#c8a46a]/20 px-5 py-5"><div><p className="eyebrow">Your order</p><h2 className="mt-1 text-2xl font-semibold">A coffee moment, curated.</h2></div><button type="button" onClick={close} aria-label="Close order bag" className="rounded-full p-2 text-[#3b2a1f] hover:bg-[#c8a46a]/15"><X /></button></div>
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {items.length === 0 ? <div className="rounded-3xl border border-dashed border-[#c8a46a]/45 p-8 text-center text-sm text-[#3b2a1f]/80"><p>Your order bag is waiting for something delicious.</p><Link href="/menu" onClick={close} className="mt-4 inline-flex rounded-full bg-[#3b2a1f] px-4 py-2 font-semibold text-white">Browse the menu</Link></div> : <div className="space-y-3">{items.map((item) => <div key={item.name} className="flex items-center justify-between rounded-2xl border border-[#c8a46a]/20 p-4"><div><p className="font-semibold">{item.name}</p><p className="mt-1 text-sm text-[#8b6a3d]">Rs. {item.price}</p></div><div className="flex items-center gap-3"><button onClick={() => updateQuantity(item.name, -1)} aria-label={`Remove one ${item.name}`} className="rounded-full border p-1"><Minus size={14} /></button><span className="w-4 text-center text-sm font-semibold">{item.quantity}</span><button onClick={() => updateQuantity(item.name, 1)} aria-label={`Add one ${item.name}`} className="rounded-full border p-1"><Plus size={14} /></button></div></div>)}</div>}
          {items.length > 0 && <Link href="/menu" onClick={close} className="mt-5 inline-flex items-center rounded-full border border-[#8b6a3d]/30 px-4 py-2 text-sm font-semibold text-[#3b2a1f] transition hover:bg-[#efe3d1]">← Continue browsing menu</Link>}
          <div className="mt-7 grid gap-3 sm:grid-cols-[1.25fr_1fr]">
            <button type="button" aria-pressed={method === "foodpanda"} onClick={() => setMethod("foodpanda")} className={`rounded-2xl border p-4 text-left transition ${method === "foodpanda" ? "border-[#d2a24c] bg-[#d2a24c] text-[#160f07] shadow-[0_12px_28px_rgba(210,162,76,0.28)]" : "border-[#c8a46a]/35 bg-[#efe3d1] text-[#3b2a1f] hover:border-[#d2a24c]"}`}><div className="flex items-center gap-2.5"><Image src="/icons8-foodpanda-48.png" alt="Foodpanda" width={24} height={24} /><span className="text-base font-bold">Order via Foodpanda</span></div><span className="mt-2 block text-sm leading-5 opacity-80">Fast checkout, live tracking, and secure payment.</span><span className="mt-3 inline-block text-xs font-bold uppercase tracking-wide">Recommended</span></button>
            <button type="button" aria-pressed={method === "direct"} onClick={() => setMethod("direct")} className={`rounded-2xl border p-4 text-left transition ${method === "direct" ? "border-[#3b2a1f] bg-[#3b2a1f] text-white shadow-[0_12px_28px_rgba(59,42,31,0.2)]" : "border-[#c8a46a]/35 bg-[#fffaf3] text-[#3b2a1f] hover:border-[#8b6a3d]"}`}><div className="flex items-center gap-2.5"><Image src="/whatsapp.png" alt="WhatsApp" width={22} height={22} /><span className="text-base font-bold">Order from 9 BAR</span></div><span className="mt-2 block text-sm leading-5 opacity-75">Use your cart and confirm your order directly on WhatsApp.</span><span className="mt-3 inline-block text-xs font-bold">Website order</span></button>
          </div>
          {method === "foodpanda" ? <div className="mt-6 rounded-3xl border border-[#c8a46a]/25 p-5 text-sm leading-6 text-[#3b2a1f]/75"><p className="font-semibold text-[#3b2a1f]">Order and tracking handled by Foodpanda.</p><p className="mt-2">You&apos;ll be redirected to the 9 BAR Foodpanda store for secure checkout and live tracking.</p><Link href={foodpandaUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d2a24c] px-5 py-3 font-bold text-[#160f07]"><Image src="/icons8-foodpanda-48.png" alt="Foodpanda" width={18} height={18} />Continue to Foodpanda</Link></div> : <>
            <div className="mt-6 rounded-3xl bg-[#3b2a1f] p-5 text-[#f8efe5]"><div className="flex justify-between text-sm"><span>Order total</span><span>Rs. {total}</span></div><p className="mt-3 text-xs leading-5 text-[#f8efe5]/70">{deliveryFeeText}</p><p className="mt-2 text-xs leading-5 text-[#f8efe5]/70">Delivery address, fee, and dispatch details are confirmed directly via WhatsApp.</p>
              <div className="mt-5 grid gap-3">
                {missingFields.length > 0 && <p role="alert" className="rounded-xl bg-[#f8efe5] px-3 py-2 text-sm font-semibold text-[#7b241c]">Please complete the highlighted fields before ordering.</p>}
                <label className="grid gap-1 text-sm font-semibold text-white">Your name<input value={customerName} onChange={(e) => { setCustomerName(e.target.value); setMissingFields((current) => current.filter((field) => field !== "name")); }} aria-invalid={missingFields.includes("name")} className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-[#111] outline-none ${missingFields.includes("name") ? "border-[#e77b6b] ring-2 ring-[#e77b6b]/60" : "border-transparent"}`} />{missingFields.includes("name") && <span className="text-xs text-[#ffd2ca]">Name is required.</span>}</label>
                <label className="grid gap-1 text-sm font-semibold text-white">Phone number<input value={customerPhoneLocal} onChange={(e) => { setCustomerPhoneLocal(e.target.value); setMissingFields((current) => current.filter((field) => field !== "phone")); }} onBlur={fillSavedCustomer} inputMode="tel" aria-invalid={missingFields.includes("phone")} className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-[#111] outline-none ${missingFields.includes("phone") ? "border-[#e77b6b] ring-2 ring-[#e77b6b]/60" : "border-transparent"}`} />{missingFields.includes("phone") && <span className="text-xs text-[#ffd2ca]">Phone number is required.</span>}</label>
                <div className={`rounded-xl border p-3 ${missingFields.includes("location") ? "border-[#e77b6b] bg-[#5a3228]" : "border-white/25 bg-white/10"}`}><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold text-white">Delivery location</p><p className="mt-1 text-xs text-[#f8efe5]/80">Share your live Google Maps location for precise delivery.</p></div><button type="button" onClick={getLocation} disabled={isLocating} className="inline-flex items-center gap-2 rounded-full bg-[#f8efe5] px-4 py-2 text-sm font-bold text-[#3b2a1f] disabled:opacity-60"><LocateFixed size={16} />{isLocating ? "Getting location…" : "Get live location"}</button></div>{customerAddress && <div className="mt-3 rounded-lg bg-[#1e4a35] p-3 text-xs text-[#e6fff0]"><p className="font-bold">Live location added{locationAccuracy ? ` — accurate within about ${locationAccuracy} m` : ""}.</p><Link href={customerAddress} target="_blank" rel="noreferrer" className="mt-2 inline-block font-bold underline">Review your pin on Google Maps</Link><label className="mt-3 flex items-start gap-2 font-semibold"><input type="checkbox" checked={locationConfirmed} onChange={(event) => { setLocationConfirmed(event.target.checked); setMissingFields((current) => current.filter((field) => field !== "location")); }} className="mt-0.5 h-4 w-4 accent-[#d2a24c]" />I confirm this map pin is correct.</label></div>}{locationError && <p className="mt-3 text-xs font-semibold text-[#ffd2ca]">{locationError}</p>}{missingFields.includes("location") && <p className="mt-3 text-xs font-semibold text-[#ffd2ca]">Get and confirm your live location before ordering.</p>}</div>
              </div>
              <button onClick={checkout} disabled={!items.length || isCheckingOut} className="mt-5 w-full rounded-full bg-[#d2a24c] px-5 py-3.5 text-sm font-bold text-[#160f07] disabled:cursor-not-allowed disabled:opacity-50">Checkout on WhatsApp</button></div>
          </>}
      </div>
    </aside></>;
}
