export interface User {
  _id: string
  userId: string
  username?: string
  full_name?: string
  region?: string
  district?: string
  school?: string
  parent?: string
  age_group?: string
  phone?: string
  parent_phone?: string
  registered: boolean
  referrals: Referral[]
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export interface Referral {
  _id: string
  userId: string
  username: string
  fullName: string
  joinedAt: string
}

export interface Analytics {
  overview: {
    totalUsers: number
    registeredUsers: number
    unregisteredUsers: number
    totalReferrals: number
    recentRegistrations: number
    monthlyRegistrations: number
  }
  distributions: {
    byRegion: Array<{ region: string; count: number }>
    byAgeGroup: Array<{ ageGroup: string; count: number }>
  }
}

export interface FilterOptions {
  regions: string[]
  districts: string[]
  ageGroups: string[]
}

export interface TopReferrer {
  _id: string
  userId: string
  username?: string
  full_name?: string
  region?: string
  school?: string
  referralCount: number
}

export interface RegistrationGrowth {
  date: string
  newUsers: number
  newReferrals: number
}

export interface AuthResponse {
  token: string
}

export interface UsersResponse {
  page: number
  limit: number
  total: number
  pages: number
  users: User[]
}
