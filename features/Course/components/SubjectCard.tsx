import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { BookOpen, Clock } from "lucide-react"
import { cn } from "@/shared/lib/utils"

interface SubjectCardProps {
    id: string
    name: string
    description: string
    lessons: number
    status: "active" | "completed"
    image: string
    progress?: number
}

export function SubjectCard({ id, name, description, lessons, status, image, progress = 0 }: SubjectCardProps) {
    return (
        <Link href={`/subject/${id}`}>
            <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer h-full">
                <div className="relative h-60 overflow-hidden bg-muted">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge
                        className={cn(
                            "absolute top-3 right-3",
                            status === "completed" ? "bg-green-500/90 text-white" : "bg-primary/90",
                        )}
                    >
                        {status === "completed" ? "Hoàn thành" : "Đang học"}
                    </Badge>
                </div>

                <CardHeader className="pb-3">
                    <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">{name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                </CardHeader>

                <CardContent className="pb-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{lessons} bài học</span>
                        </div>
                        {progress > 0 && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{progress}% hoàn thành</span>
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="pt-0">
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
