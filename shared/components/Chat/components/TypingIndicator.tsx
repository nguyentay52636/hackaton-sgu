"use client"

import { motion } from "framer-motion"
import { Bot } from "lucide-react"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"

export default function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2"
        >
            <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    <Bot className="h-4 w-4" />
                </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    )
}

