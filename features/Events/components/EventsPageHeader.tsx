"use client"

import { Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function EventsPageHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg mb-4">
                <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Sự Kiện Ẩm Thực
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tham gia các workshop, lớp nấu ăn và tour ẩm thực để khám phá văn hóa ẩm thực Sài Gòn
            </p>
        </motion.div>
    )
}

