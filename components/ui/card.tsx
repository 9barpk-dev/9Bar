import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[20px] border border-[#c8a46a]/30 bg-[linear-gradient(135deg,rgba(255,253,249,0.92),rgba(246,240,232,0.78))] shadow-[0_16px_42px_rgba(59,42,31,0.1)] backdrop-blur-xl",
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
