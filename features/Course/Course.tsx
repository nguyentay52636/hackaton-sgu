import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { SubjectCard } from "./components/SubjectCard"
import { BookOpen, TrendingUp, Clock, Award, ArrowRight } from "lucide-react"

// Mock data
const recentSubjects = [
    {
        id: "1",
        name: "Lập trình Web nâng cao",
        description: "Học React, Next.js và các công nghệ web hiện đại",
        lessons: 24,
        status: "active" as const,
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 65,
    },
    {
        id: "2",
        name: "Trí tuệ nhân tạo",
        description: "Khám phá Machine Learning và Deep Learning",
        lessons: 18,
        status: "active" as const,
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 40,
    },
    {
        id: "3",
        name: "Cơ sở dữ liệu",
        description: "SQL, NoSQL và thiết kế cơ sở dữ liệu",
        lessons: 20,
        status: "completed" as const,
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 100,
    },
    {
        id: "3",
        name: "Cơ sở dữ liệu",
        description: "SQL, NoSQL và thiết kế cơ sở dữ liệu",
        lessons: 20,
        status: "completed" as const,
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 100,
    },
    {
        id: "3",
        name: "Cơ sở dữ liệu",
        description: "SQL, NoSQL và thiết kế cơ sở dữ liệu",
        lessons: 20,
        status: "completed" as const,
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 100,
    },
    {
        id: "3",
        name: "Cơ sở dữ liệu",
        description: "SQL, NoSQL và thiết kế cơ sở dữ liệu",
        lessons: 20,
        status: "completed" as const,
        image: "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress: 100,
    },
]

const stats = [
    {
        title: "Môn học đang học",
        value: "5",
        icon: BookOpen,
        trend: "+2 từ tháng trước",
    },
    {
        title: "Bài học hoàn thành",
        value: "127",
        icon: TrendingUp,
        trend: "+23 tuần này",
    },
    {
        title: "Giờ học",
        value: "48.5h",
        icon: Clock,
        trend: "+12h tuần này",
    },
    {
        title: "Điểm trung bình",
        value: "8.5",
        icon: Award,
        trend: "+0.3 từ tháng trước",
    },
]

export default function Course() {
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
                    {recentSubjects.map((subject) => (
                        <SubjectCard key={subject.id} {...subject} />
                    ))}
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
