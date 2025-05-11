import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  className?: string
}

export function StatsCard({ title, value, icon, className }: StatsCardProps) {
  return (
    <Card className={`bg-zinc-900 border-zinc-800 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400">{title}</p>
            <h3 className="text-2xl font-bold font-heading mt-1">{value}</h3>
          </div>
          {icon && <div className="text-zinc-400">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
