import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { BookOpen, Video, FileText } from "lucide-react";
import StudentChat from "@/features/main/components/Translator/components/StudentChat";
import { Button } from "@/shared/ui/button";

// 🔹 Giả lập dữ liệu bài học
const mockSession = {
    _id: "s001",
    title: "Bài học 1: Giới thiệu về HTML",
    description: "Tìm hiểu cơ bản về cấu trúc trang HTML và các thẻ phổ biến.",
    type: "video", // "video" hoặc "text"
    contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    textContent: `
    HTML (HyperText Markup Language) là ngôn ngữ đánh dấu được dùng để xây dựng cấu trúc cơ bản của trang web.
    Trong bài học này, bạn sẽ học về các thẻ cơ bản như <html>, <head>, <body>, <h1> đến <h6>, <p>, và <a>.
  `,
    subject: "Lập trình Web cơ bản",
    createdAt: "2025-10-28T08:00:00Z",
};

export default async function LessonDetailPage() {
    const session = mockSession;

    return (
        <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            {/* 👈 Cột trái: Video hoặc Văn bản */}
            <div className="space-y-6">
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {session.title}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{session.description}</p>

                        {session.type === "video" ? (
                            <div className="relative w-full">
                                <video
                                    controls
                                    className="w-full rounded-lg shadow-md"
                                    src={session.contentUrl}
                                />
                            </div>
                        ) : (
                            <div className="prose max-w-none bg-gray-50 p-4 rounded-lg border">
                                <p>{session.textContent}</p>
                            </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{session.subject}</span>
                            <span>•</span>
                            <span>
                                {new Date(session.createdAt).toLocaleDateString("vi-VN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>

                        <div className="pt-4">
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                                {session.type === "video" ? "Xem lại bài học" : "Đọc thêm"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 📚 Thông tin hoặc bài tập khác */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5" /> Tài liệu bổ sung
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc ml-6 text-sm text-muted-foreground">
                            <li><a href="#" className="text-blue-600 hover:underline">Giới thiệu HTML (PDF)</a></li>
                            <li><a href="#" className="text-blue-600 hover:underline">Ví dụ HTML mẫu</a></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* 👉 Cột phải: Chat bình luận học sinh */}
            <div className="h-full">
                <StudentChat />
            </div>
        </div>
    );
}
