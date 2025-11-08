import Link from "next/link"
import { GraduationCap, HeartHandshake } from "lucide-react"

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12  bg-primary rounded-xl sm:rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <div className="relative">
                    <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-white transition-transform duration-300 group-hover:scale-110" />
                    <HeartHandshake className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
                </div>
            </div>

            <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold leading-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-purple-700 transition-all duration-300">
                    InclusiveLearn
                </h1>
                <p className="text-xs text-muted-foreground font-normal leading-tight">
                    Học tập hòa nhập với AI
                </p>
            </div>
        </Link>
    )
}

