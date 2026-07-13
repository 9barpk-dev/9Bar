"use client";

import { useState } from "react";
import { CheckCircle2, LoaderCircle, Navigation, XCircle } from "lucide-react";
import { calculateDistanceKm, deliveryConfig } from "@/lib/delivery";

export function DeliveryAvailabilityChecker() {
  const [state, setState] = useState<"idle" | "checking" | "available" | "unavailable" | "error">("idle");
  const [distance, setDistance] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const checkDelivery = () => {
    if (!navigator.geolocation) { setState("error"); setMessage("Location services are not supported by this browser."); return; }
    setState("checking"); setMessage("");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const kilometres = calculateDistanceKm(deliveryConfig.kitchen, { latitude: coords.latitude, longitude: coords.longitude });
      setDistance(kilometres); setState(kilometres <= deliveryConfig.radiusKm ? "available" : "unavailable");
    }, (error) => { setState("error"); setMessage(error.code === error.PERMISSION_DENIED ? "Please allow location access to check delivery availability." : "We could not determine your location. Please try again."); }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  };
  const positive = state === "available";
  return <section aria-labelledby="delivery-checker-title" className="delivery-checker mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="relative overflow-hidden rounded-[30px] border border-[#d2a24c]/25 bg-[linear-gradient(120deg,rgba(67,43,22,0.78),rgba(20,15,12,0.92)_50%,rgba(31,24,18,0.87))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-8"><div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="max-w-xl"><p className="eyebrow">Delivery, without the guesswork</p><h2 id="delivery-checker-title" className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">Check if we deliver to you.</h2><p className="mt-3 text-sm leading-7 text-[#f8efe5]/70">We currently deliver within {deliveryConfig.radiusKm} km of our Faisalabad kitchen. Your location is only used in this browser.</p></div><button type="button" onClick={checkDelivery} disabled={state === "checking"} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[#f3cf86]/50 bg-[#d2a24c] px-5 py-3 text-sm font-bold text-[#160f07] disabled:opacity-80">{state === "checking" ? <LoaderCircle className="animate-spin" size={18} /> : <Navigation size={18} />}{state === "checking" ? "Checking location…" : "Use My Current Location"}</button></div>{state !== "idle" && state !== "checking" && <div className={`mt-6 flex gap-3 rounded-2xl border p-4 text-sm ${positive ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-50" : "border-rose-300/20 bg-rose-400/10 text-rose-50"}`}>{positive ? <CheckCircle2 className="shrink-0 text-emerald-300" size={20} /> : <XCircle className="shrink-0 text-rose-300" size={20} />}<div>{positive ? <><p className="font-bold">Delivery Available</p><p className="mt-1">You are {distance?.toFixed(1)} km from our kitchen.</p></> : <><p className="font-bold">{state === "unavailable" ? "Sorry, we currently don’t deliver to your location." : "We need your location to check delivery."}</p><p className="mt-1">{state === "unavailable" ? `You are ${distance?.toFixed(1)} km away; our delivery radius is ${deliveryConfig.radiusKm} km.` : message}</p></>}</div></div>}</div></section>;
}
