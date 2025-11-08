import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Progress } from "@/shared/ui/progress"
import { BookOpen, Clock, CheckCircle, Lock, PlayCircle, ArrowLeft, Video, Headphones, FileText } from "lucide-react"

type LessonStatus = "locked" | "active" | "completed"
type LessonType = "video" | "audio" | "document" | "text"

interface Lesson {
    id: string
    title: string
    duration: string
    status: LessonStatus
    type: LessonType
    description?: string
    resourceUrl?: string
}

interface SubjectDetail {
    id: string
    name: string
    description: string
    image: string
    progress: number
    status: "active" | "completed"
    lessons: Lesson[]
}

const SUBJECTS: SubjectDetail[] = [
    {
        id: "1",
        name: "Lập trình Web nâng cao",
        description: "Học React, Next.js và các công nghệ web hiện đại.",
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 65,
        status: "active",
        lessons: [
            {
                id: "l1",
                title: "Giới thiệu khoá học",
                duration: "10 phút",
                status: "completed",
                type: "video",
                description: "Video giới thiệu tổng quan về khoá học và mục tiêu học tập",
                resourceUrl: "https://example.com/video/intro.mp4"
            },
            {
                id: "l2",
                title: "React cơ bản - Lý thuyết",
                duration: "25 phút",
                status: "active",
                type: "document",
                description: "Tài liệu PDF về các khái niệm cơ bản của React",
                resourceUrl: "https://example.com/docs/react-basics.pdf"
            },
            {
                id: "l3",
                title: "Podcast: Quản lý state",
                duration: "30 phút",
                status: "active",
                type: "audio",
                description: "Audio podcast về các pattern quản lý state trong React",
                resourceUrl: "https://example.com/audio/state-management.mp3"
            },
            {
                id: "l4",
                title: "Next.js 15 App Router - Video hướng dẫn",
                duration: "35 phút",
                status: "locked",
                type: "video",
                description: "Video tutorial chi tiết về App Router trong Next.js 15",
                resourceUrl: "https://example.com/video/nextjs-app-router.mp4"
            },
            {
                id: "l5",
                title: "SSR & SSG - Tài liệu tham khảo",
                duration: "28 phút",
                status: "locked",
                type: "text",
                description: "Bài viết chi tiết về Server-Side Rendering và Static Site Generation",
                resourceUrl: "https://example.com/articles/ssr-ssg.md"
            },
            {
                id: "l6",
                title: "Tối ưu hiệu năng - Video demo",
                duration: "22 phút",
                status: "locked",
                type: "video",
                description: "Video demo các kỹ thuật tối ưu hiệu năng trong Next.js",
                resourceUrl: "https://example.com/video/performance-optimization.mp4"
            },
        ],
    },
    {
        id: "2",
        name: "Trí tuệ nhân tạo",
        description: "Khám phá Machine Learning, xây dựng mô hình và đánh giá.",
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 40,
        status: "active",
        lessons: [
            {
                id: "l1",
                title: "Giới thiệu AI",
                duration: "12 phút",
                status: "completed",
                type: "video",
                description: "Video giới thiệu về Trí tuệ nhân tạo và ứng dụng",
                resourceUrl: "https://example.com/video/ai-intro.mp4"
            },
            {
                id: "l2",
                title: "Hồi quy tuyến tính - Audio bài giảng",
                duration: "32 phút",
                status: "active",
                type: "audio",
                description: "Audio bài giảng về thuật toán hồi quy tuyến tính",
                resourceUrl: "https://example.com/audio/linear-regression.mp3"
            },
            {
                id: "l3",
                title: "Phân loại - Tài liệu PDF",
                duration: "30 phút",
                status: "locked",
                type: "document",
                description: "Tài liệu PDF về các thuật toán phân loại trong Machine Learning",
                resourceUrl: "https://example.com/docs/classification.pdf"
            },
            {
                id: "l4",
                title: "Mạng neural - Video tutorial",
                duration: "45 phút",
                status: "locked",
                type: "video",
                description: "Video tutorial về kiến trúc và hoạt động của mạng neural",
                resourceUrl: "https://example.com/video/neural-networks.mp4"
            },
        ],
    },
    {
        id: "3",
        name: "Cơ sở dữ liệu",
        description: "SQL, NoSQL và thiết kế cơ sở dữ liệu.",
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 100,
        status: "completed",
        lessons: [
            {
                id: "l1",
                title: "Mô hình dữ liệu",
                duration: "20 phút",
                status: "completed",
                type: "document",
                description: "Tài liệu về các mô hình dữ liệu quan hệ và phi quan hệ",
                resourceUrl: "https://example.com/docs/data-models.pdf"
            },
            {
                id: "l2",
                title: "SQL nâng cao - Video thực hành",
                duration: "35 phút",
                status: "completed",
                type: "video",
                description: "Video hướng dẫn thực hành các câu lệnh SQL nâng cao",
                resourceUrl: "https://example.com/video/advanced-sql.mp4"
            },
            {
                id: "l3",
                title: "NoSQL tổng quan - Bài viết",
                duration: "25 phút",
                status: "completed",
                type: "text",
                description: "Bài viết tổng quan về các loại cơ sở dữ liệu NoSQL",
                resourceUrl: "https://example.com/articles/nosql-overview.md"
            },
        ],
    },
]

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

export default async function page({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    const resolvedParams = await params
    const subject = SUBJECTS.find((s) => s.id === resolvedParams.id)

    if (!subject) {
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
                                    <Button variant={isLocked ? "outline" : "default"} className="w-full" disabled={isLocked}>
                                        {actionLabel}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
