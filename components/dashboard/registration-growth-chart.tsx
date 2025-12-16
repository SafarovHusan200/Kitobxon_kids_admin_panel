"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

interface RegistrationGrowthChartProps {
  data: Array<{
    date: string;
    newUsers: number;
    newReferrals: number;
  }>;
}

export function RegistrationGrowthChart({
  data,
}: RegistrationGrowthChartProps) {
  console.log("User Growth Over Time", data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth Over Time</CardTitle>
        <CardDescription>
          Registration and referral trends for the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="newUsers"
              stroke="#3B82F6"
              strokeWidth={2}
              name="New Users"
            />
            <Line
              type="monotone"
              dataKey="newReferrals"
              stroke="#10B981"
              strokeWidth={2}
              name="New Referrals"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
