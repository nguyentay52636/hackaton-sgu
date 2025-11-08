import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/features/auth"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden">
        <img
          alt="Saigon Flavor"
          className="absolute inset-0 h-full w-full bg-cover object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        <div className="relative z-10 text-center px-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-snug drop-shadow-lg">
            Khám Phá Hương Vị <span className="text-[#FFB347]">Sài Gòn</span>
          </h2>
          <p className="text-gray-200 text-lg max-w-md mx-auto leading-relaxed">
            Trải nghiệm tinh hoa ẩm thực từ những góc phố bình dị đến hương vị đẳng cấp —
            nơi văn hóa và con người hòa quyện trong từng món ăn.
          </p>
        </div>
        =
      </div>

      {/* Bên phải: Form login */}
      <div className="flex flex-col gap-6 p-6 md:p-10 bg-white">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-semibold text-lg text-gray-800">
            <div className="bg-[#C9482B] text-white flex size-7 items-center justify-center rounded-md shadow-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            SaigonTaste
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
