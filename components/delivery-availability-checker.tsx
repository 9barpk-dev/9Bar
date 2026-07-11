"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, LoaderCircle, Navigation, XCircle } from "lucide-react";
import { calculateDistanceKm, deliveryConfig } from "@/lib/delivery";

type CheckState = "idle" | "checking" | "available" | "unavailable" | "error";

export function DeliveryAvailabilityChecker() {
  const [state, setState] = useState<CheckState>("idle");
  const [distance, setDistance] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const checkAvailability = () => {
    if (!navigator.geolocation) {
      setState("error");
      setErrorMessage("Location services are not supported by this browser.");
      return;
    }

    setState("checking");
    setErrorMessage("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const kilometres = calculateDistanceKm(
          { latitude: deliveryConfig.kitchen.latitude, longitude: deliveryConfig.kitchen.longitude },
          { latitude: coords.latitude, longitude: coords.longitude },
        );
        setDistance(kilometres);
        setState(kilometres <= deliveryConfig.radiusKm ? "available" : "unavailable");
      },
      (error) => {
        setState("error");
        setErrorMessage(error.code === error.PERMISSION_DENIED
          ? "Please allow location access to check delivery availability."
          : "We could not determine your location. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  return (
    <section aria-labelledby="delivery-checker-title" className="delivery-checker mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[30px] border border-[#d2a24c]/25 bg-[linear-gradient(120deg,rgba(67,43,22,0.78),rgba(20,15,12,0.92)_50%,rgba(31,24,18,0.87))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d2a24c]/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl"><p className="eyebrow">Delivery, without the guesswork</p><h2 id="delivery-checker-title" className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">Check if we deliver to you.</h2><p className="mt-3 text-sm leading-7 text-[#f8efe5]/70">We currently deliver within {deliveryConfig.radiusKm} km of our Faisalabad kitchen. Your location is only used in this browser to calculate distance.</p></div>
          <button type="button" onClick={checkAvailability} disabled={state === "checking"} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[#f3cf86]/50 bg-[#d2a24c] px-5 py-3 text-sm font-bold text-[#160f07] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e4b05d] disabled:cursor-wait disabled:opacity-80">
            {state === "checking" ? <LoaderCircle className="animate-spin" size={18} /> : <Navigation size={18} />} {state === "checking" ? "Checking location…" : "📍 Use My Current Location"}
          </button>
        </div>
        <AnimatePresence mode="wait">
          {state !== "idle" && state !== "checking" && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={`relative mt-6 flex gap-3 rounded-2xl border p-4 text-sm ${state === "available" ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-50" : "border-rose-300/20 bg-rose-400/10 text-rose-50"}`}>
            {state === "available" ? <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={20} /> : <XCircle className="mt-0.5 shrink-0 text-rose-300" size={20} />}
            <div>{state === "available" && <><p className="font-bold">Delivery Available</p><p className="mt-1 text-emerald-50/80">You are {distance?.toFixed(1)} km from our kitchen. Your order will reach you in approximately 15–20 minutes after it is prepared.</p></>}{state === "unavailable" && <><p className="font-bold">Sorry, we currently don&apos;t deliver to your location.</p><p className="mt-1 text-rose-50/75">You are {distance?.toFixed(1)} km away; our current delivery radius is {deliveryConfig.radiusKm} km.</p></>}{state === "error" && <><p className="font-bold">We need your location to check delivery.</p><p className="mt-1 text-rose-50/75">{errorMessage}</p></>}</div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </section>
  );
}
