import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: string;
  color?: "blue" | "green" | "purple" | "orange";
}

const colorClasses = {
  blue: "text-blue-600 bg-blue-50 dark:bg-blue-950",
  green: "text-green-600 bg-green-50 dark:bg-green-950",
  purple: "text-purple-600 bg-purple-50 dark:bg-purple-950",
  orange: "text-orange-600 bg-orange-50 dark:bg-orange-950",
};

const textColorClasses = {
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
};

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color = "blue",
}: StatsCardProps) {
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between   ">
        <CardTitle className={`text-xm md:text-lg font-medium `}>
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg ${colorClasses[color]}  absolute right-2 top-2 z-0 `}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold z-10 ${textColorClasses[color]}`}>
          {value.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && <p className="text-xs text-green-600 mt-1">{trend}</p>}
      </CardContent>
    </Card>
  );
}
