import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  cart: any[]
  favorites: string[]
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  addToCart: (item: any) => void
  removeFromCart: (itemId: string) => void
  toggleFavorite: (restaurantId: string) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      cart: [],
      favorites: [],

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (email, password) => {
        // Simulate API call
        const mockUser = {
          id: "1",
          name: "Nguyễn Văn A",
          email,
          avatar: "/placeholder.svg",
        }
        set({ user: mockUser, isAuthenticated: true })
      },

      logout: () => set({ user: null, isAuthenticated: false, cart: [], favorites: [] }),

      addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),

      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),

      toggleFavorite: (restaurantId) =>
        set((state) => {
          const favorites = state.favorites.includes(restaurantId)
            ? state.favorites.filter((id) => id !== restaurantId)
            : [...state.favorites, restaurantId]
          return { favorites }
        }),
    }),
    {
      name: "user-storage",
    },
  ),
)
