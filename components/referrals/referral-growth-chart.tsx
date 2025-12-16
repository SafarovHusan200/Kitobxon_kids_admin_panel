"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

interface ReferralGrowthChartProps {
  data: Array<{
    date: string
    count: number
  }>
  period: "daily" | "monthly"
  totalReferrals: number
}

export function ReferralGrowthChart({ data, period, totalReferrals }: ReferralGrowthChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral Growth</CardTitle>
        <CardDescription>
          {period === "daily" ? "Last 30 days" : "Last 6 months"} - Total: {totalReferrals} referrals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} name="Referrals" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
