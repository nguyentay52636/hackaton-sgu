export interface Event {
    id: number
    title: string
    category: string
    date: string
    time: string
    location: string
    host: string
    participants: number
    maxParticipants: number
    price: string
    image?: string
    description: string
    rating: number
    level: string
    isFeatured?: boolean
    isTrending?: boolean
}

export interface Category {
    id: string
    label: string
    count: number
}

