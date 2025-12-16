"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

interface MonthlyBreakdownChartProps {
  data: Array<{
    month: string
    registered: number
    unregistered: number
  }>
}

export function MonthlyBreakdownChart({ data }: MonthlyBreakdownChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Breakdown</CardTitle>
        <CardDescription>Last 6 months - Registered vs Unregistered</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="registered" stackId="a" fill="#10B981" name="Registered" />
            <Bar dataKey="unregistered" stackId="a" fill="#9CA3AF" name="Unregistered" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
