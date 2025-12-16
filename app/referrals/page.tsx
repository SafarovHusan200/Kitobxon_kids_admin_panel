"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ReferralGrowthChart } from "@/components/referrals/referral-growth-chart"
import { ReferralStats } from "@/components/referrals/referral-stats"
import { ExtendedTopReferrers } from "@/components/referrals/extended-top-referrers"
import { getReferralGrowth, getTopReferrers, getAnalyticsOverview } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReferralsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<"daily" | "monthly">("daily")
  const [dateRange, setDateRange] = useState("30")
  const [growthData, setGrowthData] = useState<any[]>([])
  const [topReferrers, setTopReferrers] = useState<any[]>([])
  const [stats, setStats] = useState({
    averageReferrals: 0,
    mostActiveRegion: "",
    growthRate: 0,
    totalReferrals: 0,
  })

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [growthResponse, referrersResponse, overviewResponse] = await Promise.all([
          getReferralGrowth(period),
          getTopReferrers(20),
          getAnalyticsOverview(),
        ])

        console.log("[v0] Referrals data loaded:", { growthResponse, referrersResponse, overviewResponse })

        setGrowthData(growthResponse.data || [])
        setTopReferrers(referrersResponse)

        // Calculate stats
        const totalUsers = overviewResponse.overview?.totalUsers || 1
        const totalReferrals = overviewResponse.overview?.totalReferrals || 0
        const averageReferrals = totalReferrals / totalUsers

        // Find most active region
        const regionData = overviewResponse.distributions?.byRegion || []
        const mostActive = regionData.reduce((max: any, region: any) => (region.count > max.count ? region : max), {
          region: "N/A",
          count: 0,
        })

        // Calculate growth rate (mock calculation - adjust based on your API)
        const growthRate = growthResponse.growthRate || 12.5

        setStats({
          averageReferrals,
          mostActiveRegion: mostActive.region,
          growthRate,
          totalReferrals,
        })
      } catch (error) {
        console.error("[v0] Error fetching referrals data:", error)
        toast({
          title: "Error",
          description: "Failed to load referrals data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated, period, toast])

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <Header title="Referrals" />
          <main className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Header title="Referrals" />
        <main className="p-6 space-y-6">
          {/* Period Selector and Date Range */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Tabs value={period} onValueChange={(value) => setPeriod(value as "daily" | "monthly")}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Referral Stats */}
          <ReferralStats
            averageReferrals={stats.averageReferrals}
            mostActiveRegion={stats.mostActiveRegion}
            growthRate={stats.growthRate}
          />

          {/* Growth Chart */}
          <ReferralGrowthChart data={growthData} period={period} totalReferrals={stats.totalReferrals} />

          {/* Top Referrers */}
          <ExtendedTopReferrers data={topReferrers} />
        </main>
      </div>
    </div>
  )
}
