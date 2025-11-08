import { create } from "zustand"
import axios from "axios"

interface Weather {
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    icon: string
    forecast: {
        time: string
        temperature: number
        condition: string
        icon: string
    }[]
}

interface WeatherStore {
    weather: Weather | null
    isLoading: boolean
    error: string | null
    fetchWeather: (latitude: number, longitude: number) => Promise<void>
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    weather: null,
    isLoading: false,
    error: null,

    fetchWeather: async (latitude, longitude) => {
        set({ isLoading: true, error: null })

        try {
            // Using Open-Meteo API (free, no API key required)
            const response = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&timezone=Asia/Bangkok&forecast_days=1`,
            )

            const data = response.data

            // Map weather codes to conditions
            const getWeatherCondition = (code: number) => {
                if (code === 0) return "Quang đãng"
                if (code <= 3) return "Có mây"
                if (code <= 67) return "Mưa"
                if (code <= 77) return "Tuyết"
                if (code <= 99) return "Giông bão"
                return "Không xác định"
            }

            const getWeatherIcon = (code: number) => {
                if (code === 0) return "☀️"
                if (code <= 3) return "⛅"
                if (code <= 67) return "🌧️"
                if (code <= 77) return "❄️"
                if (code <= 99) return "⛈️"
                return "🌤️"
            }

            const weather: Weather = {
                temperature: Math.round(data.current.temperature_2m),
                condition: getWeatherCondition(data.current.weather_code),
                humidity: data.current.relative_humidity_2m,
                windSpeed: data.current.wind_speed_10m,
                icon: getWeatherIcon(data.current.weather_code),
                forecast: data.hourly.time.slice(0, 4).map((time: string, index: number) => ({
                    time: new Date(time).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                    temperature: Math.round(data.hourly.temperature_2m[index]),
                    condition: getWeatherCondition(data.hourly.weather_code[index]),
                    icon: getWeatherIcon(data.hourly.weather_code[index]),
                })),
            }

            set({ weather, isLoading: false })
        } catch (error) {
            set({
                error: "Không thể tải thông tin thời tiết",
                isLoading: false,
            })
        }
    },
}))
