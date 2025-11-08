"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Mic, Volume2, MessageSquare, Captions, Accessibility, BookOpen, Globe, Sparkles } from "lucide-react"
import Link from "next/link"

export function AboutPages() {
    const features = [
        {
            icon: Mic,
            title: "Chuyển giọng nói thành văn bản",
            description: "Ghi âm giọng nói, nhận dạng và hiển thị văn bản theo thời gian thực",
            color: "text-blue-500",
        },
        {
            icon: Volume2,
            title: "Chuyển văn bản thành giọng nói",
            description: "Đọc nội dung văn bản bằng giọng nói AI, có thể chọn giọng nam/nữ, tốc độ đọc",
            color: "text-purple-500",
        },
        {
            icon: MessageSquare,
            title: "Chatbot học tập AI",
            description: "Học sinh nhập câu hỏi hoặc nói, chatbot trả lời thông minh, dễ hiểu",
            color: "text-green-500",
        },
        {
            icon: Captions,
            title: "Phụ đề tự động",
            description: "Hiển thị văn bản theo thời gian thực trong lớp học hoặc video",
            color: "text-orange-500",
        },
        {
            icon: Accessibility,
            title: "Hỗ trợ trợ năng",
            description: "Chỉnh kích thước chữ, độ tương phản, highlight theo giọng đọc",
            color: "text-pink-500",
        },
        {
            icon: BookOpen,
            title: "Ghi chú học tập tự động",
            description: "Ghi âm → chuyển văn bản → tóm tắt ý chính → lưu lại",
            color: "text-cyan-500",
        },
        {
            icon: Globe,
            title: "Đa ngôn ngữ",
            description: "Hỗ trợ tiếng Việt, Anh và có thể mở rộng sang nhiều ngôn ngữ khác",
            color: "text-indigo-500",
        },
        {
            icon: Sparkles,
            title: "AI thông minh",
            description: "Sử dụng công nghệ AI tiên tiến để hỗ trợ học tập hiệu quả nhất",
            color: "text-yellow-500",
        },
    ]

    return (
        <div className="min-h-screen">



            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <Badge variant="secondary" className="px-4 py-1 text-sm">
                        Công nghệ AI tiên tiến cho giáo dục hòa nhập
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            AI lắng nghe, đọc hiểu
                        </span>
                        <br />
                        <span className="text-foreground">và giúp bạn học tốt hơn</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Nền tảng học tập thông minh hỗ trợ người học có nhu cầu đặc biệt với công nghệ chuyển đổi giọng nói - văn
                        bản và trợ lý AI cá nhân hóa
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="text-lg px-8 h-12" asChild>
                            <Link href="/workspace">Bắt đầu học ngay</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-12 bg-transparent" asChild>
                            <Link href="/guide">Xem hướng dẫn</Link>
                        </Button>
                    </div>

                    {/* Hero Image/Animation */}
                    <div className="mt-12 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10" />
                        <div className="rounded-2xl border bg-card shadow-2xl p-8 md:p-12">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                {[
                                    { icon: Mic, label: "Speech-to-Text" },
                                    { icon: Volume2, label: "Text-to-Speech" },
                                    { icon: MessageSquare, label: "AI Chatbot" },
                                    { icon: Accessibility, label: "Accessibility" },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-accent transition-colors"
                                    >
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary cursor-pointer flex items-center justify-center animate-pulse-slow">
                                            <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                        </div>
                                        <span className="text-xs md:text-sm font-medium text-center">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center mb-12">
                    <Badge variant="secondary" className="mb-4">
                        Tính năng nổi bật
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Công cụ học tập toàn diện</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Tất cả những gì học sinh cần để học tập hiệu quả và dễ dàng hơn
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1">
                            <CardHeader>
                                <div
                                    className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4`}
                                >
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                </div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container mx-auto px-4 py-16 md:py-24 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-3xl">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">
                            Lợi ích
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Học tập không còn rào cản</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <span className="text-3xl">👂</span>
                            </div>
                            <h3 className="font-semibold text-lg">Hỗ trợ khiếm thính</h3>
                            <p className="text-sm text-muted-foreground">
                                Chuyển đổi giọng nói thành văn bản giúp học sinh khiếm thính theo dõi bài giảng dễ dàng
                            </p>
                        </div>

                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <span className="text-3xl">👁️</span>
                            </div>
                            <h3 className="font-semibold text-lg">Hỗ trợ khiếm thị</h3>
                            <p className="text-sm text-muted-foreground">
                                Đọc to văn bản và điều khiển bằng giọng nói giúp học sinh khiếm thị học tập độc lập
                            </p>
                        </div>

                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <span className="text-3xl">🧠</span>
                            </div>
                            <h3 className="font-semibold text-lg">Hỗ trợ khó học</h3>
                            <p className="text-sm text-muted-foreground">
                                AI chatbot giải thích đơn giản, tóm tắt nội dung phù hợp với từng học sinh
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center space-y-8 bg-primary rounded-3xl p-12 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold">Sẵn sàng bắt đầu hành trình học tập?</h2>
                    <p className="text-lg text-blue-50">
                        Tham gia cùng hàng nghìn học sinh đang sử dụng LearnAssist để học tập hiệu quả hơn mỗi ngày
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8 h-12" asChild>
                            <Link href="/workspace">Bắt đầu miễn phí</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 h-12 border-white text-white hover:bg-white/20 bg-transparent"
                            asChild
                        >
                            <Link href="#contact">Liên hệ tư vấn</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}

        </div>
    )
}
