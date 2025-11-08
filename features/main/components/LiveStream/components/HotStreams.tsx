import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Eye, Flame } from "lucide-react"
import { motion } from "framer-motion"
import StreamCard from "./StreamCard"

interface Stream {
    id: number
    title: string
    restaurant: string
    host: string
    viewers: number
    thumbnail: string
    isLive: boolean
}

interface HotStreamsProps {
    streams: Stream[]
}

export default function HotStreams({ streams }: HotStreamsProps) {
    return (
        <div className="border-t bg-gradient-to-br from-card/50 to-background backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Livestream đang hot</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {streams.map((stream, index) => (
                    <StreamCard key={stream.id} stream={stream} index={index} />
                ))}
            </div>
        </div>
    )
}

