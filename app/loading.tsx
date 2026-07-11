import Image from "next/image";

export default function Loading() {
  return <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#f6f0e8] text-[#3b2a1f]"><div className="relative h-20 w-20 overflow-hidden rounded-full border border-[#c8a46a]/60 shadow-[0_12px_28px_rgba(139,106,61,0.2)]"><Image src="/images/brand/9bar-brand-art.png" alt="" fill sizes="80px" className="object-cover object-[50%_31%] scale-[1.75]" /></div><span className="font-serif text-xl tracking-[0.22em]">9 BAR</span><span className="h-px w-20 animate-pulse bg-[#c8a46a]" /></div>;
}
