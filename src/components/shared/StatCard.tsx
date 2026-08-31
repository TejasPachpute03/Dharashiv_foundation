import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  className?: string
  href?: string
}

export function StatCard({ title, value, icon, description, className, href }: StatCardProps) {
  const content = (
    <Card className={cn("overflow-hidden h-full", href && "cursor-pointer", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>
  }

  return content
}
