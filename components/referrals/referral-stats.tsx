import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Target } from "lucide-react"

interface ReferralStatsProps {
  averageReferrals: number
  mostActiveRegion: string
  growthRate: number
}

export function ReferralStats({ averageReferrals, mostActiveRegion, growthRate }: ReferralStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average Referrals</CardTitle>
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{averageReferrals.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground mt-1">Per user</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Most Active Region</CardTitle>
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950">
            <Target className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold truncate">{mostActiveRegion}</div>
          <p className="text-xs text-muted-foreground mt-1">Leading in referrals</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Growth Rate</CardTitle>
          <div className="p-2 rounded-lg bg-green-50 text-green-600 dark:bg-green-950">
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {growthRate > 0 ? "+" : ""}
            {growthRate.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">vs previous period</p>
        </CardContent>
      </Card>
    </div>
  )
}
