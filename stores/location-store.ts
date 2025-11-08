import { create } from "zustand"

interface Location {
    latitude: number
    longitude: number
}

interface Restaurant {
    id: string
    name: string
    address: string
    latitude: number
    longitude: number
    rating: number
    distance?: number
}

interface LocationStore {
    userLocation: Location | null
    nearbyRestaurants: Restaurant[]
    isLoadingLocation: boolean
    error: string | null
    setUserLocation: (location: Location) => void
    fetchNearbyRestaurants: (location: Location) => Promise<void>
    requestLocation: () => Promise<void>
}

export const useLocationStore = create<LocationStore>((set, get) => ({
    userLocation: null,
    nearbyRestaurants: [],
    isLoadingLocation: false,
    error: null,

    setUserLocation: (location) => set({ userLocation: location }),

    fetchNearbyRestaurants: async (location) => {
        // Simulate API call to fetch nearby restaurants
        const mockRestaurants: Restaurant[] = [
            {
                id: "1",
                name: "Phở Hòa Pasteur",
                address: "260C Pasteur, Quận 3",
                latitude: 10.7769,
                longitude: 106.6955,
                rating: 4.8,
                distance: 0.5,
            },
            {
                id: "2",
                name: "Bánh Mì Huỳnh Hoa",
                address: "26 Lê Thị Riêng, Quận 1",
                latitude: 10.7679,
                longitude: 106.6903,
                rating: 4.9,
                distance: 1.2,
            },
            {
                id: "3",
                name: "Cơm Tấm Mộc",
                address: "311 Nguyễn Trọng Tuyển, Quận 3",
                latitude: 10.7869,
                longitude: 106.6755,
                rating: 4.7,
                distance: 2.1,
            },
        ]

        set({ nearbyRestaurants: mockRestaurants })
    },

    requestLocation: async () => {
        set({ isLoadingLocation: true, error: null })

        if (!navigator.geolocation) {
            set({ error: "Trình duyệt không hỗ trợ định vị", isLoadingLocation: false })
            return
        }

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })

            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }

            set({ userLocation: location, isLoadingLocation: false })
            await get().fetchNearbyRestaurants(location)
        } catch (error) {
            set({
                error: "Không thể lấy vị trí của bạn",
                isLoadingLocation: false,
            })
        }
    },
}))
