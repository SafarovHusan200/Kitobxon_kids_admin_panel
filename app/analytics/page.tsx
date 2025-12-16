"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { OverviewCards } from "@/components/analytics/overview-cards"
import { RegistrationTrendsChart } from "@/components/analytics/registration-trends-chart"
import { MonthlyBreakdownChart } from "@/components/analytics/monthly-breakdown-chart"
import { RegistrationStatusPie } from "@/components/analytics/registration-status-pie"
import { RegionalActivityHeatmap } from "@/components/analytics/regional-activity-heatmap"
import { getAnalyticsOverview, getRegistrationGrowth } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function AnalyticsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [overview, setOverview] = useState<any>(null)
  const [trendsData, setTrendsData] = useState<any[]>([])
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [heatmapData, setHeatmapData] = useState<any[]>([])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [overviewData, dailyGrowth, monthlyGrowth] = await Promise.all([
          getAnalyticsOverview(),
          getRegistrationGrowth("daily"),
          getRegistrationGrowth("monthly"),
        ])

        console.log("[v0] Analytics data loaded:", { overviewData, dailyGrowth, monthlyGrowth })

        setOverview(overviewData)

        // Process trends data - combine total and registered users
        const trendsData = dailyGrowth.map((item: any) => ({
          date: item.date,
          total: item.newUsers || 0,
          registered: Math.round((item.newUsers || 0) * 0.7), // Mock registered data
        }))
        setTrendsData(trendsData)

        // Process monthly breakdown
        const monthlyBreakdown = monthlyGrowth.map((item: any) => {
          const total = item.newUsers || 0
          const registered = Math.round(total * 0.7) // Mock registered percentage
          return {
            month: item.date,
            registered,
            unregistered: total - registered,
          }
        })
        setMonthlyData(monthlyBreakdown)

        // Generate heatmap data from regional distribution
        const regions = overviewData.distributions?.byRegion || []
        const months = monthlyGrowth.map((m: any) => m.date)

        const heatmap = regions.slice(0, 10).map((region: any) => ({
          region: region.region,
          months: months.map((month: string) => ({
            month,
            count: Math.floor(Math.random() * region.count), // Mock monthly data
          })),
        }))
        setHeatmapData(heatmap)
      } catch (error) {
        console.error("[v0] Error fetching analytics data:", error)
        toast({
          title: "Error",
          description: "Failed to load analytics data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated, toast])

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
          <Header title="Analytics" />
          <main className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
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

  const stats = overview?.overview || {
    totalUsers: 0,
    registeredUsers: 0,
    unregisteredUsers: 0,
    totalReferrals: 0,
  }

  const averageReferrals = stats.totalUsers > 0 ? stats.totalReferrals / stats.totalUsers : 0

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Header title="Analytics" />
        <main className="p-6 space-y-6">
          {/* Overview Cards */}
          <OverviewCards
            totalUsers={stats.totalUsers}
            registeredUsers={stats.registeredUsers}
            unregisteredUsers={stats.unregisteredUsers}
            totalReferrals={stats.totalReferrals}
            averageReferrals={averageReferrals}
          />

          {/* Registration Trends */}
          <RegistrationTrendsChart data={trendsData} />

          {/* Charts Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            <MonthlyBreakdownChart data={monthlyData} />
            <RegistrationStatusPie registered={stats.registeredUsers} unregistered={stats.unregisteredUsers} />
          </div>

          {/* Heatmap */}
          <RegionalActivityHeatmap data={heatmapData} />
        </main>
      </div>
    </div>
  )
}
