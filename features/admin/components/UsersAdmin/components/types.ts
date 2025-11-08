export interface User {
    id: number
    name: string
    email: string
    avatar?: string
    role: "user" | "owner" | "admin"
    joinDate: string
    status: "active" | "pending" | "suspended"
    phone: string
    totalReviews: number
    totalFavorites: number
    lastActive: string
}

export interface UserStats {
    total: number
    active: number
    suspended: number
    newThisMonth: number
}

