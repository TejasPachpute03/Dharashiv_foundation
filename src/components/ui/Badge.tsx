import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-sm": variant === "default",
          "border-primary bg-accent-light text-primary hover:bg-accent hover:text-accent-foreground shadow-sm": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-sm": variant === "destructive",
          "text-foreground border-border": variant === "outline",
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200": variant === "success",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
