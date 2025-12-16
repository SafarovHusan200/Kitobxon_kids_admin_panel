import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, Share2 } from "lucide-react"

interface OverviewCardsProps {
  totalUsers: number
  registeredUsers: number
  unregisteredUsers: number
  totalReferrals: number
  averageReferrals: number
}

export function OverviewCards({
  totalUsers,
  registeredUsers,
  unregisteredUsers,
  totalReferrals,
  averageReferrals,
}: OverviewCardsProps) {
  const registeredPercentage = totalUsers > 0 ? ((registeredUsers / totalUsers) * 100).toFixed(1) : "0"
  const unregisteredPercentage = totalUsers > 0 ? ((unregisteredUsers / totalUsers) * 100).toFixed(1) : "0"

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950">
            <Users className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">All users in system</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Registered vs Unregistered</CardTitle>
          <div className="p-2 rounded-lg bg-green-50 text-green-600 dark:bg-green-950">
            <CheckCircle className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {registeredUsers} / {unregisteredUsers}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {registeredPercentage}% registered, {unregisteredPercentage}% not
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Referrals</CardTitle>
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950">
            <Share2 className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalReferrals.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Total referrals made</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average Referrals</CardTitle>
          <div className="p-2 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950">
            <Share2 className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{averageReferrals.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">Per user</p>
        </CardContent>
      </Card>
    </div>
  )
}
