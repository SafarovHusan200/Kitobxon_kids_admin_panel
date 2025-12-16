"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from "recharts"

interface RegistrationTrendsChartProps {
  data: Array<{
    date: string
    total: number
    registered: number
  }>
}

export function RegistrationTrendsChart({ data }: RegistrationTrendsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Trends</CardTitle>
        <CardDescription>Daily registrations for the last 30 days</CardDescription>
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
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} name="Total Users" />
            <Line type="monotone" dataKey="registered" stroke="#10B981" strokeWidth={2} name="Registered Users" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
