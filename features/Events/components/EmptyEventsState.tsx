"use client"

import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/shared/ui/card"
import { motion } from "framer-motion"

export default function EmptyEventsState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="border-2 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Không tìm thấy sự kiện</h3>
                    <p className="text-muted-foreground text-center">
                        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm sự kiện
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    )
}

