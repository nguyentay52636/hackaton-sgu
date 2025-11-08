import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Progress } from "@/shared/ui/progress"
import { BookOpen, Clock, CheckCircle, Lock, PlayCircle, ArrowLeft, Video, Headphones, FileText } from "lucide-react"
import { ApiSubject, ApiSession, LessonStatus, LessonType } from "@/features/Course/types"
import { transformSubjectToDetail } from "@/features/Course/utils"
import { mockSubjects, mockSessions } from "@/features/Course/mockData"

interface SubjectDetailPageProps {
    params: Promise<{ id: string }> | { id: string }
    subjects?: ApiSubject[]
    sessions?: ApiSession[]
}

function LessonStatusIcon({ status }: { status: LessonStatus }) {
    if (status === "completed") return <CheckCircle className="h-5 w-5 text-green-600" />
    if (status === "locked") return <Lock className="h-5 w-5 text-muted-foreground" />
    return <PlayCircle className="h-5 w-5 text-primary" />
}

function LessonTypeIcon({ type }: { type: LessonType }) {
    switch (type) {
        case "video":
            return <Video className="h-4 w-4" />
        case "audio":
            return <Headphones className="h-4 w-4" />
        case "document":
            return <FileText className="h-4 w-4" />
        case "text":
            return <FileText className="h-4 w-4" />
        default:
            return <BookOpen className="h-4 w-4" />
    }
}

function LessonTypeBadge({ type }: { type: LessonType }) {
    const typeLabels = {
        video: "Video",
        audio: "Audio",
        document: "Tài liệu",
        text: "Văn bản",
    }

    const typeColors = {
        video: "bg-red-500/10 text-red-600 border-red-500/20",
        audio: "bg-purple-500/10 text-purple-600 border-purple-500/20",
        document: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        text: "bg-green-500/10 text-green-600 border-green-500/20",
    }

    return (
        <Badge variant="outline" className={`${typeColors[type]} text-xs flex items-center gap-1`}>
            <span className="h-3 w-3 flex items-center justify-center">
                <LessonTypeIcon type={type} />
            </span>
            {typeLabels[type]}
        </Badge>
    )
}

export default async function page({
    params
}: {
    params: Promise<{ id: string }> | { id: string }
    // TODO: Add subjects and sessions props when API integration is ready
    // subjects?: ApiSubject[]
    // sessions?: ApiSession[]
}) {
    const resolvedParams = await params

    // Using mock data - Replace with actual API call when ready
    const subjects: ApiSubject[] = mockSubjects
    const sessions: ApiSession[] = mockSessions

    // Find subject by ID
    const apiSubject = subjects.find((s) => s._id === resolvedParams.id)

    if (!apiSubject) {
        return (
            <div className="p-6 space-y-4">
                <Link href="/subject" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại danh sách môn học
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle>Không tìm thấy môn học</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Vui lòng kiểm tra lại đường dẫn hoặc chọn môn học khác.
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Transform API data to display format
    const subject = transformSubjectToDetail(apiSubject, sessions)

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-4">
                <Link href="/subject" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại môn học
                </Link>

                <Card className="overflow-hidden">
                    <div className="relative h-44 w-full">
                        <img src={subject.image} alt={subject.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <CardHeader className="pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">{subject.name}</h1>
                                <p className="text-sm text-muted-foreground mt-1">{subject.description}</p>
                            </div>
                            <Badge className={subject.status === "completed" ? "bg-green-500 text-white" : "bg-primary/90"}>
                                {subject.status === "completed" ? "Hoàn thành" : "Đang học"}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">Tiến độ khoá học</div>
                                <div className="flex items-center gap-3">
                                    <Progress value={subject.progress} className="w-full" />
                                    <span className="text-sm font-medium min-w-12 text-right">{subject.progress}%</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Tổng số bài học</div>
                                <div className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> {subject.lessons.length} bài</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Thời lượng ước tính</div>
                                {(() => {
                                    const totalMinutes = subject.lessons.reduce((sum, l) => {
                                        const m = l.duration.match(/\d+/)
                                        return sum + (m ? parseInt(m[0], 10) : 0)
                                    }, 0)
                                    return (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" /> ~{totalMinutes} phút
                                        </div>
                                    )
                                })()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Lessons List */}
            <div className="space-y-3">
                <h2 className="text-xl font-semibold">Danh sách bài học</h2>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {subject.lessons.map((lesson) => {
                        const isLocked = lesson.status === "locked"
                        const isCompleted = lesson.status === "completed"
                        const actionLabel = isLocked ? "Khoá" : isCompleted ? "Xem lại" : "Tiếp tục"

                        return (
                            <Card key={lesson.id} className="group transition-all hover:shadow-md">
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <CardTitle className="text-base line-clamp-2 group-hover:text-primary flex-1">
                                                    {lesson.title}
                                                </CardTitle>
                                                <LessonStatusIcon status={lesson.status} />
                                            </div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{lesson.duration}</span>
                                                </div>
                                                <LessonTypeBadge type={lesson.type} />
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {lesson.description || "Mô tả bài học sẽ hiển thị tại đây."}
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Link href={`/subject/${resolvedParams.id}/${lesson.id}`} className="w-full">
                                        <Button variant={isLocked ? "outline" : "default"} className="w-full" disabled={isLocked}>
                                            {actionLabel}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
