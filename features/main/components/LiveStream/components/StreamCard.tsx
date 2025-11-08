import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Eye } from "lucide-react"
import { motion } from "framer-motion"

interface Stream {
    id: number
    title: string
    restaurant: string
    thumbnail: string
    isLive: boolean
    viewers: number
}

interface StreamCardProps {
    stream: Stream
    index: number
}

export default function StreamCard({ stream, index }: StreamCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
        >
            <Card className="cursor-pointer! hover:shadow-xl transition-all border-2 hover:border-primary/50 overflow-hidden group">
                <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                        <img
                            src={stream.thumbnail || "/placeholder.svg"}
                            alt={stream.title}
                            className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {stream.isLive && (
                            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-red-500 text-white border-0 shadow-lg">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                    className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"
                                />
                                LIVE
                            </Badge>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                            <Eye className="h-3 w-3 text-red-400" />
                            <span className="font-semibold">{stream.viewers.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-card to-background">
                        <h4 className="font-semibold text-sm truncate mb-1">{stream.title}</h4>
                        <p className="text-xs text-muted-foreground truncate">{stream.restaurant}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

