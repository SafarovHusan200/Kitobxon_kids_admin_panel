"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RegionalActivityHeatmapProps {
  data: Array<{
    region: string;
    months: Array<{
      month: string;
      count: number;
    }>;
  }>;
}

export function RegionalActivityHeatmap({
  data,
}: RegionalActivityHeatmapProps) {
  // Transform data for recharts
  // Get all unique months
  const months = data[0]?.months.map((m) => m.month) || [];

  // Restructure data: each month becomes a data point with regions as keys
  const chartData = months.map((month) => {
    const dataPoint: any = { month };
    data.forEach((region) => {
      const monthData = region.months.find((m) => m.month === month);
      dataPoint[region.region] = monthData?.count || 0;
    });
    return dataPoint;
  });

  // Colors for different regions
  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#8B5CF6", // purple
    "#EC4899", // pink
    "#14B8A6", // teal
    "#F97316", // orange
    "#6366F1", // indigo
    "#84CC16", // lime
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Activity Trends</CardTitle>
        <CardDescription>
          User activity across regions over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: "currentColor" }}
            />
            <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                transform: "rotate(-90deg)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="square" />
            {data.slice(0, 10).map((region, index) => (
              <Bar
                key={region.region}
                dataKey={region.region}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
