"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface DailyUsersBarChartProps {
  data: {
    _id: {
      year: number | null;
      month: number | null;
      day: number | null;
    };
    count: number;
    registered: number;
  }[];
}

export default function DailyUsersBarChart({ data }: DailyUsersBarChartProps) {
  // data array ichidagi bitta element tipi
  type RawItem = DailyUsersBarChartProps["data"][number];

  // null bo‘lgan sanalarni chiqarib tashlab, chart uchun formatlaymiz
  const chartData = data
    .filter(
      (item: RawItem) =>
        item._id.year !== null &&
        item._id.month !== null &&
        item._id.day !== null
    )
    .map((item: RawItem) => ({
      date: `${item._id.day}.${item._id.month}.${item._id.year}`,
      users: item.count,
      registered: item.registered,
    }));

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">User statistics by days</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="users"
              fill="#007bff"
              name="Total users"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="registered"
              name="Registered users"
              radius={[6, 6, 0, 0]}
              fill="#5cb85c"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
