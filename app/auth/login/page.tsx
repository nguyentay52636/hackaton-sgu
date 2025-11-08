import { BrainCircuit } from "lucide-react"
import { LoginForm } from "@/features/auth"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-primary!">

      {/* --- Bên trái: Hình nền & giới thiệu dự án --- */}
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-indigo-700/40 via-indigo-900/60 to-slate-900/80" />

        <div className="relative z-10 text-center px-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-snug drop-shadow-lg">
            <span className="text-[#8BD3E6]">AI</span> Đồng Hành Cùng{" "}
            <span className="text-[#C7A6FF]">Học Tập Hòa Nhập</span>
          </h2>
          <p className="text-gray-200 text-lg max-w-md mx-auto leading-relaxed">
            Công cụ hỗ trợ học sinh có nhu cầu đặc biệt — chuyển đổi giọng nói và văn bản,
            đọc hiểu cùng chatbot AI thân thiện, hướng tới giáo dục không rào cản.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-6 md:p-10 bg-white dark:bg-slate-900">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">

            <LoginForm />
            <p className="text-sm text-gray-500 mt-4 text-center">
              © 2025 InclusiveLearn — Nền tảng học tập hòa nhập thông minh
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}
