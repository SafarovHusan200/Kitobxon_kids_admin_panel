"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts"

interface RegistrationStatusPieProps {
  registered: number
  unregistered: number
}

const COLORS = {
  registered: "#10B981",
  unregistered: "#9CA3AF",
}

export function RegistrationStatusPie({ registered, unregistered }: RegistrationStatusPieProps) {
  const data = [
    { name: "Registered", value: registered },
    { name: "Unregistered", value: unregistered },
  ]

  const total = registered + unregistered
  const registeredPercentage = total > 0 ? ((registered / total) * 100).toFixed(1) : "0"
  const unregisteredPercentage = total > 0 ? ((unregistered / total) * 100).toFixed(1) : "0"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Status</CardTitle>
        <CardDescription>Distribution of registered vs unregistered users</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "Registered" ? COLORS.registered : COLORS.unregistered}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{registeredPercentage}%</div>
            <div className="text-sm text-muted-foreground">Registered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">{unregisteredPercentage}%</div>
            <div className="text-sm text-muted-foreground">Unregistered</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
