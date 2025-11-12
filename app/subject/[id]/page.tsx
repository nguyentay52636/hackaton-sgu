"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Progress } from "@/shared/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Separator } from "@/shared/ui/separator"
import {
    ArrowLeft,
    Play,
    CheckCircle,
    Clock,
    FileText,
    Video,
    Headphones,
    BookOpen,
    Download,
    Lock,
} from "lucide-react"
import { transformSubjectWithApiLessons } from "@/features/Course/utils"
import { getAllSubjects, Subject } from "@/apis/subjectApi"
import { getAllLessons, Lesson as ApiLesson } from "@/apis/lessonApi"

interface PageProps {
    params: Promise<{ id: string }> | { id: string }
}

interface LessonMaterial {
    id: string
    title: string
    type: string
    url?: string
    size?: string
    downloadable: boolean
}

interface DisplayLesson {
    id: string
    title: string
    description: string
    order: number
    duration: number
    type: string
    materials: LessonMaterial[]
    isCompleted: boolean
}

export default function Page({ params }: PageProps) {
    const [subjectId, setSubjectId] = useState<string>("")
    const [subject, setSubject] = useState<any>(null)
    const [lessons, setLessons] = useState<DisplayLesson[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const resolveParams = async () => {
            const resolved = await params
            setSubjectId(resolved.id)
        }
        resolveParams()
    }, [params])

    useEffect(() => {
        if (subjectId) {
            loadSubjectData()
        }
    }, [subjectId])

    const loadSubjectData = async () => {
        setLoading(true)
        try {
            // Fetch data from API
            const subjects: Subject[] = await getAllSubjects()
            const apiLessons: ApiLesson[] = await getAllLessons()

            // Find subject by ID
            const apiSubject = subjects.find((s) => s._id === subjectId)

            if (!apiSubject) {
                setSubject(null)
                setLoading(false)
                return
            }

            // Transform API data to display format
            const transformedSubject = transformSubjectWithApiLessons(apiSubject, apiLessons)

            // Transform lessons to display format with materials
            const displayLessons: DisplayLesson[] = transformedSubject.lessons.map((lesson, index) => {
                // Find the original API lesson to get resources
                const apiLesson = apiLessons.find((l) => l._id === lesson.id)

                // Transform resources to materials
                const materials: LessonMaterial[] = apiLesson?.resources.map((resource, idx) => {
                    // Determine if downloadable based on type
                    const downloadable = resource.type !== "video" && resource.type !== "audio"

                    return {
                        id: resource._id || `material-${idx}`,
                        title: `${resource.type === "video" ? "Video bài giảng" : resource.type === "audio" ? "Audio giải thích" : resource.type === "document" ? "Tài liệu học tập" : "Tài liệu"}`,
                        type: resource.type,
                        url: resource.url,
                        downloadable,
                    }
                }) || []

                // Extract duration number from string like "25 phút"
                const durationMatch = lesson.duration.match(/\d+/)
                const duration = durationMatch ? parseInt(durationMatch[0], 10) : 0

                return {
                    id: lesson.id,
                    title: lesson.title,
                    description: lesson.description || "",
                    order: index + 1,
                    duration,
                    type: lesson.type,
                    materials,
                    isCompleted: lesson.status === "completed",
                }
            })

            setSubject({
                id: transformedSubject.id,
                name: transformedSubject.name,
                description: transformedSubject.description,
                progress: transformedSubject.progress,
                status: transformedSubject.status,
                image: transformedSubject.image,
                teacherName: apiSubject.teacher || "Giảng viên",
            })
            setLessons(displayLessons)
        } catch (error) {
            console.error("Error loading subject:", error)
        } finally {
            setLoading(false)
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "video":
                return <Video className="h-4 w-4" />
            case "audio":
                return <Headphones className="h-4 w-4" />
            case "document":
                return <FileText className="h-4 w-4" />
            case "interactive":
                return <Play className="h-4 w-4" />
            default:
                return <BookOpen className="h-4 w-4" />
        }
    }

    const getTypeBadge = (type: string) => {
        const colors: Record<string, string> = {
            video: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            audio: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
            document: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            interactive: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            text: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        }
        return colors[type] || colors.document
    }

    const completedLessons = lessons.filter((l) => l.isCompleted).length
    const totalLessons = lessons.length

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                    <p className="mt-2 text-muted-foreground">Đang tải môn học...</p>
                </div>
            </div>
        )
    }

    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h3 className="text-lg font-semibold">Không tìm thấy môn học</h3>
                    <Link href="/subject">
                        <Button className="mt-4">Quay lại danh sách môn học</Button>
                    </Link>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto p-6 space-y-6">
                {/* Header with Back Button */}
                <Link href="/subject">
                    <Button variant="ghost" className="gap-2 mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh sách môn học
                    </Button>
                </Link>

                {/* Subject Header */}
                <Card className="overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                        <img
                            src={subject.image || "/placeholder.svg"}
                            alt={subject.name}
                            className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <Badge className="mb-2 bg-white/20 backdrop-blur-sm">{subject.name}</Badge>
                            <h1 className="text-3xl font-bold">{subject.name}</h1>
                        </div>
                    </div>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-4">
                                <p className="text-muted-foreground leading-relaxed">{subject.description}</p>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Giảng viên:</span>
                                        <p className="font-medium mt-1">{subject.teacherName}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Bài học:</span>
                                        <p className="font-medium mt-1">
                                            {completedLessons}/{totalLessons} hoàn thành
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm">Tiến độ học tập</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl font-bold text-blue-600">{subject.progress}%</span>
                                            <CheckCircle className="h-8 w-8 text-blue-500" />
                                        </div>
                                        <Progress value={subject.progress} className="h-3" />
                                        <p className="text-xs text-muted-foreground">
                                            {completedLessons} trong {totalLessons} bài học
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Lessons List */}
                <Tabs defaultValue="lessons" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="lessons">Danh sách bài học</TabsTrigger>
                        <TabsTrigger value="materials">Tài liệu tổng hợp</TabsTrigger>
                    </TabsList>

                    <TabsContent value="lessons" className="space-y-3">
                        {lessons.map((lesson) => (
                            <Card
                                key={lesson.id}
                                className={`group hover:shadow-md transition-all ${lesson.isCompleted ? "border-green-200 dark:border-green-800" : ""
                                    }`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${lesson.isCompleted
                                                ? "bg-green-100 dark:bg-green-900"
                                                : "bg-gray-100 dark:bg-gray-800"
                                                }`}
                                        >
                                            {lesson.isCompleted ? (
                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                            ) : lesson.order >= 3 ? (
                                                <Lock className="h-6 w-6 text-gray-400" />
                                            ) : (
                                                getTypeIcon(lesson.type)
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                                                            {lesson.title}
                                                        </h3>
                                                        <Badge className={getTypeBadge(lesson.type)}>{lesson.type}</Badge>
                                                        {lesson.isCompleted && (
                                                            <Badge variant="outline" className="border-green-500 text-green-700">
                                                                Đã hoàn thành
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {lesson.duration} phút
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <FileText className="h-4 w-4" />
                                                            {lesson.materials.length} tài liệu
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link href={`/subject/${subjectId}/${lesson.id}`}>
                                                    <Button className="gap-2" disabled={lesson.order >= 3 && !lesson.isCompleted}>
                                                        {lesson.isCompleted ? (
                                                            <>Xem lại</>
                                                        ) : lesson.order >= 3 ? (
                                                            <>Chưa mở</>
                                                        ) : (
                                                            <>Bắt đầu học</>
                                                        )}
                                                        <Play className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>

                                            {/* Materials Preview */}
                                            {lesson.materials.length > 0 && (
                                                <div className="mt-4 pt-4 border-t">
                                                    <p className="text-xs font-medium text-muted-foreground mb-2">
                                                        Tài liệu đính kèm:
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {lesson.materials.map((material) => (
                                                            <Badge
                                                                key={material.id}
                                                                variant="secondary"
                                                                className="gap-1 cursor-pointer hover:bg-secondary/80"
                                                            >
                                                                {getTypeIcon(material.type)}
                                                                {material.title}
                                                                {material.downloadable && <Download className="h-3 w-3 ml-1" />}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="materials">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tài liệu tổng hợp</CardTitle>
                                <CardDescription>Tất cả tài liệu học tập trong môn học này</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {lessons
                                        .flatMap((lesson) => lesson.materials)
                                        .map((material) => (
                                            <div
                                                key={material.id}
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {getTypeIcon(material.type)}
                                                    <div>
                                                        <p className="font-medium">{material.title}</p>
                                                        {material.size && (
                                                            <p className="text-xs text-muted-foreground">{material.size}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                {material.downloadable && (
                                                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                                        <Download className="h-4 w-4" />
                                                        Tải xuống
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
