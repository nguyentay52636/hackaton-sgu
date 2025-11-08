"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { motion } from "framer-motion"

interface EventSearchAndFilterProps {
    searchQuery: string
    onSearchChange: (value: string) => void
}

export default function EventSearchAndFilter({ searchQuery, onSearchChange }: EventSearchAndFilterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4"
        >
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Tìm kiếm sự kiện..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 h-12 text-base"
                />
            </div>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <Filter className="h-5 w-5" />
                Bộ lọc
            </Button>
        </motion.div>
    )
}

