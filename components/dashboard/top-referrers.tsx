"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal } from "lucide-react";

interface TopReferrer {
  rank: number;
  fullName: string;
  username: string;
  region?: string;
  school?: string;
  referralCount: number;
}

interface TopReferrersProps {
  data: TopReferrer[];
}

export function TopReferrers({ data }: TopReferrersProps) {
  const sortedData = data
    .map((item, index) => ({ ...item, rank: index + 1 }))
    .sort((a, b) => b.referralCount - a.referralCount)
    .slice(0, 10);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-orange-600" />;
      default:
        return (
          <span className="text-lg font-bold text-muted-foreground">
            #{rank}
          </span>
        );
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800";
      case 2:
        return "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800";
      case 3:
        return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800";
      default:
        return "bg-card hover:bg-accent/50";
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-3">
          {sortedData.map((referrer) => (
            <div
              key={referrer.username || referrer.fullName}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${getRankClass(
                referrer.rank
              )}`}
            >
              <div className="flex items-center justify-center w-10">
                {getRankIcon(referrer.rank)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {referrer.fullName || "Unknown"}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  @{referrer.username || "no_username"}
                </p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">
                  {referrer.region || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                  {referrer.school || "-"}
                </p>
              </div>
              <Badge variant="secondary" className="ml-2">
                {referrer.referralCount} referrals
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
