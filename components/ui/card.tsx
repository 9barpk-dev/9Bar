import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 sm:p-8", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export { Card, CardContent };
