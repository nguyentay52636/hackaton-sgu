export interface Location {
    id: number
    name: string
    address: string
    phone: string
    category: string
    rating: number
    reviews: number
    lat: number
    lng: number
    status: "active" | "pending" | "inactive"
    image?: string
    openTime: string
    description: string
}

export interface LocationStats {
    total: number
    active: number
    pending: number
    avgRating: string
}

