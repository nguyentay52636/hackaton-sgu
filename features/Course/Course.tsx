"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { SubjectCard } from "./components/SubjectCard"
import { BookOpen, TrendingUp, Clock, Award, ArrowRight } from "lucide-react"
import { getAllSubjects, Subject } from "@/apis/subjectApi"

export default function Course() {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                setLoading(true)
                const data = await getAllSubjects()
                if (data) {
                    setSubjects(data)
                }
            } catch (err) {
                console.error('Error fetching subjects:', err)
                setError('Không thể tải danh sách môn học')
            } finally {
                setLoading(false)
            }
        }

        fetchSubjects()
    }, [])

    // Calculate statistics from subjects
    const activeSubjects = subjects.filter(s => s.status).length
    const totalLessons = subjects.reduce((sum, s) => sum + (Array.isArray(s.lessons) ? s.lessons.length : 0), 0)
    const completedLessons = subjects.filter(s => s.status).reduce((sum, s) => sum + (Array.isArray(s.lessons) ? s.lessons.length : 0), 0)
    const estimatedHours = (totalLessons * 0.5).toFixed(1)

    const stats = [
        {
            title: "Môn học đang học",
            value: activeSubjects.toString(),
            icon: BookOpen,
            trend: "Đang cập nhật",
        },
        {
            title: "Bài học hoàn thành",
            value: completedLessons.toString(),
            icon: TrendingUp,
            trend: "Tổng số bài học",
        },
        {
            title: "Giờ học",
            value: `${estimatedHours}h`,
            icon: Clock,
            trend: "Ước tính",
        },
        {
            title: "Tổng bài học",
            value: totalLessons.toString(),
            icon: Award,
            trend: "Tất cả môn học",
        },
    ]

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                <div className="space-y-2">
                    <p className="text-5xl text-bold">Danh sách môn học</p>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                    Đang tải dữ liệu...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 space-y-6">
                <div className="space-y-2">
                    <p className="text-5xl text-bold">Danh sách môn học</p>
                </div>
                <div className="text-center py-8 text-red-500">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <div className="space-y-2">
                <p className="text-5xl text-bold ">Danh sách môn học</p>
            </div>


            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Subjects */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Môn học gần đây</h2>
                        <p className="text-sm text-muted-foreground mt-1">Tiếp tục học từ nơi bạn đã dừng lại</p>
                    </div>
                    <Link href="/subjects">
                        <Button variant="outline" className="gap-2 bg-transparent">
                            Xem tất cả
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {subjects.length > 0 ? (
                        subjects.map((subject) => (
                            <SubjectCard
                                key={subject._id}
                                {...subject}
                                progress={subject.status ? 100 : 0}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-muted-foreground">
                            Chưa có môn học nào. Vui lòng thêm môn học để bắt đầu.
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Hành động nhanh</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent">
                        <BookOpen className="h-6 w-6" />
                        <span>Xem tài liệu</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent">
                        <Clock className="h-6 w-6" />
                        <span>Lịch học</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent">
                        <Award className="h-6 w-6" />
                        <span>Bảng xếp hạng</span>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
