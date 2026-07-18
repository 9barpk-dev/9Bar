"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { foodpandaUrl, whatsappNumber } from "@/lib/site";
import { deliveryFeeText } from "@/lib/delivery";

type CartItem = { name: string; price: number; quantity: number };
type CartContextValue = { addItem: (name: string, price: string) => void; openCart: () => void; count: number };
const CartContext = createContext<CartContextValue | null>(null);

function numericPrice(price: string) { return Number(price.replace(/[^0-9]/g, "")); }
export function useOrderCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useOrderCart must be used within OrderCartProvider");
  return context;
}

export function OrderCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const addItem = useCallback((name: string, price: string) => {
    const amount = numericPrice(price);
    setItems((current) => {
      const existing = current.find((item) => item.name === name);
      return existing ? current.map((item) => item.name === name ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { name, price: amount, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return <CartContext.Provider value={{ addItem, openCart: () => setIsOpen(true), count }}><OrderDrawer items={items} setItems={setItems} isOpen={isOpen} close={() => setIsOpen(false)} />{children}</CartContext.Provider>;
}

export function CartButton() {
  const { count, openCart } = useOrderCart();
  return <button type="button" onClick={openCart} aria-label={`Open order bag with ${count} items`} className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a46a]/45 bg-white/60 text-[#3b2a1f] transition hover:bg-[#c8a46a]/15"><ShoppingBag size={18} />{count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8b6a3d] px-1 text-[10px] font-bold text-white">{count}</span>}</button>;
}

function OrderDrawer({ items, setItems, isOpen, close }: { items: CartItem[]; setItems: React.Dispatch<React.SetStateAction<CartItem[]>>; isOpen: boolean; close: () => void }) {
  const [method, setMethod] = useState<"direct" | "foodpanda">("direct");
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal;
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneLocal, setCustomerPhoneLocal] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isReturning, setIsReturning] = useState(false);
  const updateQuantity = (name: string, change: number) => setItems((current) => current.flatMap((item) => item.name !== name ? [item] : item.quantity + change > 0 ? [{ ...item, quantity: item.quantity + change }] : []));
  const checkout = () => {
    if (!items.length) return;
    const order = items.map((item) => `${item.quantity}× ${item.name}`).join(", ");
    // persist customer details for returning customers
    try {
      if (customerName) localStorage.setItem("customerName", customerName);
      if (customerPhoneLocal) localStorage.setItem("customerPhone", customerPhoneLocal);
      if (customerAddress) localStorage.setItem("customerAddress", customerAddress);
    } catch (e) {
      /* ignore storage errors */
    }

    const customerInfo = `Name: ${customerName || "(not provided)"}\nPhone: ${customerPhoneLocal || "(not provided)"}\nAddress: ${customerAddress || "(not provided)"}\n\n`;

    const message = `Hello 9 BAR, I would like to place an order.\n\n${customerInfo}Order: ${order}\nTotal: Rs. ${total}\n\nDelivery fee: ${deliveryFeeText}\n\nPlease confirm my delivery address and delivery fee.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setItems([]);
    close();
  };

  useEffect(() => {
    try {
      const storedName = localStorage.getItem("customerName");
      const storedPhone = localStorage.getItem("customerPhone");
      const storedAddress = localStorage.getItem("customerAddress");
      if (storedName || storedPhone || storedAddress) {
        if (storedName) setCustomerName(storedName);
        if (storedPhone) setCustomerPhoneLocal(storedPhone);
        if (storedAddress) setCustomerAddress(storedAddress);
        setIsReturning(true);
      }
    } catch (e) {
      /* ignore storage errors */
    }
  }, []);

  return <>{isOpen && <div className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm" onClick={close} />}
    <aside aria-label="Your order" className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-xl flex-col bg-[#fffaf3] shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-[#c8a46a]/20 px-5 py-5"><div><p className="eyebrow">Your order</p><h2 className="mt-1 text-2xl font-semibold">A coffee moment, curated.</h2></div><button type="button" onClick={close} aria-label="Close order bag" className="rounded-full p-2 text-[#3b2a1f] hover:bg-[#c8a46a]/15"><X /></button></div>
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {items.length === 0 ? <div className="rounded-3xl border border-dashed border-[#c8a46a]/45 p-8 text-center text-sm text-[#3b2a1f]/70">Your order bag is waiting for something delicious.</div> : <div className="space-y-3">{items.map((item) => <div key={item.name} className="flex items-center justify-between rounded-2xl border border-[#c8a46a]/20 p-4"><div><p className="font-semibold">{item.name}</p><p className="mt-1 text-sm text-[#8b6a3d]">Rs. {item.price}</p></div><div className="flex items-center gap-3"><button onClick={() => updateQuantity(item.name, -1)} aria-label={`Remove one ${item.name}`} className="rounded-full border p-1"><Minus size={14} /></button><span className="w-4 text-center text-sm font-semibold">{item.quantity}</span><button onClick={() => updateQuantity(item.name, 1)} aria-label={`Add one ${item.name}`} className="rounded-full border p-1"><Plus size={14} /></button></div></div>)}</div>}
          <div className="mt-7 grid grid-cols-2 gap-2 rounded-2xl bg-[#efe3d1] p-2"><button onClick={() => setMethod("direct")} className={`rounded-xl px-3 py-3 text-left text-sm font-bold ${method === "direct" ? "bg-[#3b2a1f] text-white" : "text-[#3b2a1f]/70"}`}><div className="flex items-center gap-2"><Image src="/whatsapp.png" alt="WhatsApp" width={18} height={18} /><span>Order from 9 BAR</span></div><span className="mt-1 block text-xs font-normal opacity-75">Cart + WhatsApp checkout</span></button><button onClick={() => setMethod("foodpanda")} className={`rounded-xl px-3 py-3 text-left text-sm font-bold ${method === "foodpanda" ? "bg-[#3b2a1f] text-white" : "text-[#3b2a1f]/70"}`}><div className="flex items-center gap-2"><Image src="/icons8-foodpanda-48.png" alt="Foodpanda" width={18} height={18} /><span>Order via Foodpanda</span></div><span className="mt-1 block text-xs font-normal opacity-75">Foodpanda orders & tracking</span></button></div>
          {method === "foodpanda" ? <div className="mt-6 rounded-3xl border border-[#c8a46a]/25 p-5 text-sm leading-6 text-[#3b2a1f]/75"><p className="font-semibold text-[#3b2a1f]">Order and tracking handled by Foodpanda.</p><p className="mt-2">You&apos;ll be redirected to the 9 BAR Foodpanda store for secure checkout and live tracking.</p><Link href={foodpandaUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d2a24c] px-5 py-3 font-bold text-[#160f07]"><Image src="/icons8-foodpanda-48.png" alt="Foodpanda" width={18} height={18} />Continue to Foodpanda</Link></div> : <>
            <div className="mt-6 rounded-3xl bg-[#3b2a1f] p-5 text-[#f8efe5]"><div className="flex justify-between text-sm"><span>Order total</span><span>Rs. {total}</span></div><p className="mt-3 text-xs leading-5 text-[#f8efe5]/70">{deliveryFeeText}</p><p className="mt-2 text-xs leading-5 text-[#f8efe5]/70">Delivery address, fee, and dispatch details are confirmed directly via WhatsApp.</p>
              {isReturning && <p className="mt-3 text-sm">Welcome back{customerName ? `, ${customerName}` : ""}! We&apos;ll use your saved details unless you update them below.</p>}
              <div className="mt-4 grid gap-2">
                <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your name" className="w-full rounded-md px-3 py-2 text-sm text-[#111]" />
                <input value={customerPhoneLocal} onChange={(e) => setCustomerPhoneLocal(e.target.value)} placeholder="Phone number" className="w-full rounded-md px-3 py-2 text-sm text-[#111]" />
                <input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Delivery address (street, area)" className="w-full rounded-md px-3 py-2 text-sm text-[#111]" />
              </div>
              <button onClick={checkout} disabled={!items.length} className="mt-5 w-full rounded-full bg-[#d2a24c] px-5 py-3.5 text-sm font-bold text-[#160f07] disabled:cursor-not-allowed disabled:opacity-50">Checkout on WhatsApp</button></div>
          </>}
      </div>
    </aside></>;
}
