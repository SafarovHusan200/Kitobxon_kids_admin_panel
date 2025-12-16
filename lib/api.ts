const API_URL = "https://kitobxon.maktab16.uz";

// Store token in memory (in production, use httpOnly cookies)
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
};

export const getAuthToken = (): string | null => {
  if (authToken) return authToken;
  if (typeof window !== "undefined") {
    authToken = localStorage.getItem("auth_token");
  }
  return authToken;
};

export const clearAuthToken = () => {
  authToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
};

// Helper function for API calls with authentication
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthToken();
      throw new Error("Unauthorized - Please login again");
    }
    throw new Error(`API Error: ${response?.statusText}`);
  }

  return response.json();
}

// Authentication APIs
export const login = async (
  username: string,
  password: string
): Promise<{ token: string }> => {
  return fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

// Filter Options API
export const getFilterOptions = async () => {
  return fetchAPI<{
    regions: string[];
    districts: string[];
    ageGroups: string[];
  }>("/users/filters/options");
};

// Users APIs
export const getUsers = async (params?: {
  page?: number;
  limit?: number;
  region?: string;
  ageGroup?: string;
  registered?: boolean;
  search?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.region) queryParams.append("region", params.region);
  if (params?.ageGroup) queryParams.append("ageGroup", params.ageGroup);
  if (params?.registered !== undefined)
    queryParams.append("registered", params.registered.toString());
  if (params?.search) queryParams.append("search", params.search);

  const query = queryParams.toString();
  return fetchAPI<{
    page: number;
    limit: number;
    total: number;
    pages: number;
    users: any[];
  }>(`/users${query ? `?${query}` : ""}`);
};

export const getUserById = async (id: string) => {
  return fetchAPI<any>(`/users/${id}`);
};

export const searchUsers = async (query: string) => {
  return fetchAPI<any[]>(`/users/search?q=${encodeURIComponent(query)}`);
};

// Analytics APIs
export const getAnalyticsOverview = async () => {
  return fetchAPI<any>("/users/analytics/overview");
};

export const getRegistrationGrowth = async (period: "daily" | "monthly") => {
  return fetchAPI<any>(`/users/analytics/registration-growth?period=${period}`);
};

export const getTopReferrers = async (limit = 10) => {
  return fetchAPI<any>(`/users/referrals/top?limit=${limit}`);
};

export const getReferralGrowth = async (period: "daily" | "monthly") => {
  return fetchAPI<any>(`/users/referrals/growth?period=${period}`);
};
