"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { UserTable } from "@/components/users/user-table"
import { UserFilters } from "@/components/users/user-filters"
import { UserDrawer } from "@/components/users/user-drawer"
import { getUsers, getFilterOptions } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"

export default function UsersPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const [search, setSearch] = useState("")
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([])
  const [registrationStatus, setRegistrationStatus] = useState("all")

  const [regions, setRegions] = useState<string[]>([])
  const [ageGroups, setAgeGroups] = useState<string[]>([])

  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, authLoading, router])

  // Fetch filter options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await getFilterOptions()
        setRegions(options.regions)
        setAgeGroups(options.ageGroups)
      } catch (error) {
        console.error("[v0] Error fetching filter options:", error)
      }
    }

    if (isAuthenticated) {
      fetchOptions()
    }
  }, [isAuthenticated])

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const params: any = {
          page,
          limit: pageSize,
        }

        if (debouncedSearch) params.search = debouncedSearch
        if (selectedRegions.length > 0) params.region = selectedRegions.join(",")
        if (selectedAgeGroups.length > 0) params.ageGroup = selectedAgeGroups.join(",")
        if (registrationStatus !== "all") params.registered = registrationStatus === "registered"

        const response = await getUsers(params)
        console.log("[v0] Users data loaded:", response)

        setUsers(response.users)
        setTotal(response.total)
      } catch (error) {
        console.error("[v0] Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchUsers()
    }
  }, [isAuthenticated, page, pageSize, debouncedSearch, selectedRegions, selectedAgeGroups, registrationStatus, toast])

  const handleReset = () => {
    setSearch("")
    setSelectedRegions([])
    setSelectedAgeGroups([])
    setRegistrationStatus("all")
    setPage(1)
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your CSV file is being prepared",
    })
    // Implement CSV export logic here
  }

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setIsDrawerOpen(true)
  }

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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Header title="Users" />
        <main className="p-6 space-y-6">
          <UserFilters
            search={search}
            selectedRegions={selectedRegions}
            selectedAgeGroups={selectedAgeGroups}
            registrationStatus={registrationStatus}
            regions={regions}
            ageGroups={ageGroups}
            onSearchChange={setSearch}
            onRegionsChange={setSelectedRegions}
            onAgeGroupsChange={setSelectedAgeGroups}
            onRegistrationStatusChange={setRegistrationStatus}
            onReset={handleReset}
            onExport={handleExport}
          />

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded-lg"></div>
              ))}
            </div>
          ) : (
            <UserTable
              users={users}
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setPage(1)
              }}
              onViewUser={handleViewUser}
            />
          )}
        </main>
      </div>

      <UserDrawer user={selectedUser} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  )
}
