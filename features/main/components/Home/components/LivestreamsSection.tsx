import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Video, Eye, Play } from "lucide-react"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"

export type Livestream = {
    id: number
    title: string
    chef: string
    viewers: number
    thumbnail: string
    restaurant: string
}

export function LivestreamsSection({ streams }: { streams: Livestream[] }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Video className="h-5 w-5 text-destructive animate-pulse" />
                    Đang phát trực tiếp
                </h3>
                <Link href="/livestream">
                    <Button variant="ghost" className="gap-2">Xem tất cả</Button>
                </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {streams.map((stream) => (
                    <Card key={stream.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-destructive/30 cursor-pointer group">
                        <div className="relative h-48">
                            <img src={stream.thumbnail || "/placeholder.svg"} alt={stream.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                                    <Play className="h-8 w-8 text-destructive ml-1" />
                                </div>
                            </div>
                            <Badge className="absolute top-4 left-4 bg-destructive text-white shadow-lg animate-pulse gap-1">
                                <Video className="h-3 w-3" />
                                LIVE
                            </Badge>
                            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {stream.viewers}
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{stream.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary/20 text-primary text-xs">{stream.chef.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-semibold">{stream.chef}</p>
                                    <p className="text-xs text-muted-foreground">{stream.restaurant}</p>
                                </div>
                            </div>
                            <Link href="/livestream">
                                <Button className="w-full gap-2 bg-destructive hover:bg-destructive/90">
                                    <Play className="h-4 w-4" />
                                    Xem ngay
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


