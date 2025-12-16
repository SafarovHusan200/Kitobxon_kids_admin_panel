import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Award, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopReferrer {
  rank: number;
  fullName: string;
  username: string;
  region: string;
  school: string;
  referralCount: number;
}

interface ExtendedTopReferrersProps {
  data: TopReferrer[];
}

export function ExtendedTopReferrers({ data }: ExtendedTopReferrersProps) {
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

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 20 Referrers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((referrer, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${getRankClass(
                referrer.rank
              )}`}
            >
              <div className="flex items-center justify-center w-10">
                {getRankIcon(referrer.rank)}
              </div>

              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {getInitials(referrer.fullName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {referrer.fullName}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  @{referrer.username}
                </p>
              </div>

              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-foreground">
                  {referrer.region}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                  {referrer.school}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {referrer.referralCount} referrals
                </Badge>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
