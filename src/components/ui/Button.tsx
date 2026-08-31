import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export const buttonVariants = ({ variant = "default", size = "default", className }: { variant?: ButtonProps["variant"], size?: ButtonProps["size"], className?: string } = {}) => {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-primary text-primary-foreground shadow-sm hover:bg-accent hover:-translate-y-[1px] hover:shadow-md": variant === "default",
      "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:-translate-y-[1px] hover:shadow-md": variant === "destructive",
      "border border-primary bg-card text-primary shadow-sm hover:bg-accent-light hover:border-accent hover:-translate-y-[1px] hover:shadow-md": variant === "outline",
      "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:-translate-y-[1px] hover:shadow-md": variant === "secondary",
      "hover:bg-accent-light hover:text-accent": variant === "ghost",
      "text-primary underline-offset-4 hover:underline": variant === "link",
      "h-10 px-4 py-2": size === "default",
      "h-9 rounded-lg px-3 text-xs": size === "sm",
      "h-12 rounded-xl px-8 text-base": size === "lg",
      "h-10 w-10": size === "icon",
    },
    className
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
