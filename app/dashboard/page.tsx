"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, CheckCircle, Share2, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { StatsCard } from "@/components/dashboard/stats-card";

import { RegionDistributionChart } from "@/components/dashboard/region-distribution-chart";
import { AgeDistributionChart } from "@/components/dashboard/age-distribution-chart";
import { TopReferrers } from "@/components/dashboard/top-referrers";

import {
  getAnalyticsOverview,
  getRegistrationGrowth,
  getTopReferrers,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import DailyUsersBarChart from "@/components/dashboard/DailyUsersBarChart";

export default function DashboardPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [topReferrers, setTopReferrers] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overviewData, growthData, referrersData] = await Promise.all([
          getAnalyticsOverview(),
          getRegistrationGrowth("daily"),
          getTopReferrers(10),
        ]);

        console.log("[v0] Dashboard data loaded:", {
          overviewData,
          growthData,
          referrersData,
        });

        setOverview(overviewData);
        setGrowthData(growthData);
        setTopReferrers(referrersData);
      } catch (error) {
        console.error("[v0] Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, toast]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <Header title="Dashboard" />
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
    );
  }

  const stats = overview?.overview || {
    totalUsers: 0,
    registeredUsers: 0,
    totalReferrals: 0,
    recentRegistrations: 0,
  };

  const distributions = overview?.distributions || {
    byRegion: [],
    byAgeGroup: [],
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Header title="Dashboard" />
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              description="All started users"
              icon={Users}
              color="blue"
            />
            <StatsCard
              title="Registered Users"
              value={stats.registeredUsers}
              description="Completed registration"
              icon={CheckCircle}
              color="green"
              trend={`${Math.round(
                (stats.registeredUsers / stats.totalUsers) * 100
              )}% of total`}
            />
            <StatsCard
              title="Total Referrals"
              value={stats.totalReferrals}
              description="Total referrals made"
              icon={Share2}
              color="purple"
            />
            <StatsCard
              title="Recent Registrations"
              value={stats.recentRegistrations}
              description="Last 7 days"
              icon={TrendingUp}
              color="orange"
            />
          </div>
          {/* Registration Growth Chart */}

          <DailyUsersBarChart data={growthData} />

          {/* Distribution Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <RegionDistributionChart data={distributions.byRegion} />
            <AgeDistributionChart data={distributions.byAgeGroup} />
          </div>
          {/* Top Referrers */}
          <TopReferrers data={topReferrers} />
        </main>
      </div>
    </div>
  );
}
