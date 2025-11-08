import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { SubjectCard } from "./components/SubjectCard"
import { BookOpen, TrendingUp, Clock, Award, ArrowRight } from "lucide-react"
import { ApiSubject, ApiSession } from "./types"
import { transformSubjectToCard, calculateCourseStats } from "./utils"
import { mockSubjects, mockSessions } from "./mockData"

interface CourseProps {
    subjects?: ApiSubject[]
    sessions?: ApiSession[]
}

export default function Course({
    subjects = mockSubjects,
    sessions = mockSessions
}: CourseProps) {
    // Transform API data to display format
    const subjectCards = subjects.map(subject => transformSubjectToCard(subject, sessions))

    // Calculate statistics from real data
    const statsData = calculateCourseStats(subjects, sessions)

    const stats = [
        {
            title: "Môn học đang học",
            value: statsData.activeSubjects.toString(),
            icon: BookOpen,
            trend: "Đang cập nhật",
        },
        {
            title: "Bài học hoàn thành",
            value: statsData.completedLessons.toString(),
            icon: TrendingUp,
            trend: "Tổng số bài học",
        },
        {
            title: "Giờ học",
            value: `${statsData.estimatedHours}h`,
            icon: Clock,
            trend: "Ước tính",
        },
        {
            title: "Tổng bài học",
            value: statsData.totalLessons.toString(),
            icon: Award,
            trend: "Tất cả môn học",
        },
    ]
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
                    {subjectCards.length > 0 ? (
                        subjectCards.map((subject) => (
                            <SubjectCard key={subject.id} {...subject} />
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
