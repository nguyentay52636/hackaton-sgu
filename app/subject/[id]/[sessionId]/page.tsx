import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { BookOpen, Video, FileText } from "lucide-react";
import StudentChat from "@/features/main/components/Translator/components/StudentChat";
import { Button } from "@/shared/ui/button";
import TextContentReader from "./components/TextContentReader";

// 🎓 Danh sách bài học ảo (mock data)
const mockSessions = [
    {
        _id: "s001",
        title: "Bài học 1: Giới thiệu về HTML",
        description: "Tìm hiểu cấu trúc cơ bản của trang web với ngôn ngữ HTML.",
        type: "video",
        contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        textContent: `
      HTML (HyperText Markup Language) là ngôn ngữ đánh dấu được dùng để xây dựng cấu trúc cơ bản của trang web.
      Trong bài này, bạn sẽ học về các thẻ cơ bản như <html>, <head>, <body>, <h1>...<h6>, <p>, <a>.
    `,
        subject: "Lập trình Web cơ bản",
        createdAt: "2025-10-28T08:00:00Z",
    },
    {
        _id: "s002",
        title: "Bài học 2: CSS và cách định dạng trang web",
        description: "Hiểu cách CSS hoạt động và áp dụng để làm đẹp trang web.",
        type: "text",
        textContent: `
      CSS (Cascading Style Sheets) cho phép bạn định dạng màu sắc, font chữ, bố cục và hiệu ứng cho trang HTML.
      Trong bài này, bạn sẽ học cách chọn phần tử, sử dụng thuộc tính như color, margin, padding, background.
    `,
        subject: "Thiết kế giao diện web",
        createdAt: "2025-10-29T10:00:00Z",
    },
    {
        _id: "s003",
        title: "Bài học 3: JavaScript cơ bản",
        description: "Học cách làm trang web tương tác bằng JavaScript.",
        type: "video",
        contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        textContent: `
      JavaScript là ngôn ngữ lập trình giúp trang web trở nên sống động. Bạn sẽ học về biến, hàm, vòng lặp và sự kiện.
    `,
        subject: "Lập trình Web cơ bản",
        createdAt: "2025-11-01T14:00:00Z",
    },
    {
        _id: "s004",
        title: "Bài học 4: Xây dựng trang web hoàn chỉnh",
        description: "Tổng hợp kiến thức HTML, CSS, JS để tạo một website đầu tiên.",
        type: "text",
        textContent: `
      Trong bài này, bạn sẽ kết hợp tất cả các kỹ năng đã học để xây dựng một trang web cá nhân đơn giản, bao gồm layout, menu và nội dung.
    `,
        subject: "Dự án thực hành",
        createdAt: "2025-11-05T09:00:00Z",
    },
    {
        _id: "s005",
        title: "Bài học 5: Giới thiệu trí tuệ nhân tạo (AI)",
        description: "Tìm hiểu khái niệm cơ bản về AI và ứng dụng trong đời sống.",
        type: "video",
        contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        textContent: `
      AI (Artificial Intelligence) là lĩnh vực giúp máy tính có khả năng học và đưa ra quyết định như con người.
      Bạn sẽ tìm hiểu về Machine Learning, Chatbot, và cách AI được ứng dụng trong giáo dục.
    `,
        subject: "Công nghệ hiện đại",
        createdAt: "2025-11-08T08:00:00Z",
    },
    {
        _id: "s006",
        title: "Bài học 6: Responsive Design và Mobile First",
        description: "Học cách thiết kế website hiển thị tốt trên mọi thiết bị.",
        type: "text",
        textContent: `
      Responsive Design là phương pháp thiết kế website sao cho giao diện tự động điều chỉnh để hiển thị tối ưu trên mọi kích thước màn hình, từ điện thoại đến máy tính bàn.
      
      Trong bài này, bạn sẽ học về:
      - Media queries trong CSS
      - Flexible grid system
      - Mobile-first approach
      - Breakpoints và cách sử dụng
      - Testing trên nhiều thiết bị
      
      Kỹ thuật này rất quan trọng trong thời đại người dùng truy cập web từ nhiều thiết bị khác nhau.
    `,
        subject: "Thiết kế giao diện web",
        createdAt: "2025-11-10T09:00:00Z",
    },
    {
        _id: "s007",
        title: "Bài học 7: Git và Version Control",
        description: "Tìm hiểu cách quản lý phiên bản code với Git và GitHub.",
        type: "text",
        textContent: `
      Git là hệ thống quản lý phiên bản phân tán, giúp bạn theo dõi mọi thay đổi trong dự án và làm việc nhóm hiệu quả.
      
      Nội dung bài học bao gồm:
      - Khái niệm về Version Control
      - Cài đặt và cấu hình Git
      - Các lệnh cơ bản: init, add, commit, push, pull
      - Branch và Merge
      - GitHub và cách sử dụng
      - Best practices khi làm việc với Git
      
      Đây là kỹ năng cần thiết cho mọi lập trình viên, giúp bạn quản lý code chuyên nghiệp và cộng tác tốt hơn.
    `,
        subject: "Công cụ phát triển",
        createdAt: "2025-11-12T10:30:00Z",
    },
    {
        _id: "s008",
        title: "Bài học 8: RESTful API và JSON",
        description: "Học cách xây dựng và sử dụng API để giao tiếp giữa các ứng dụng.",
        type: "text",
        textContent: `
      API (Application Programming Interface) là giao diện cho phép các ứng dụng giao tiếp với nhau. RESTful API là một kiến trúc phổ biến sử dụng HTTP protocol.
      
      Trong bài học này, bạn sẽ tìm hiểu:
      - Khái niệm về API và REST
      - HTTP methods: GET, POST, PUT, DELETE
      - JSON format và cách parse
      - Status codes và ý nghĩa
      - Cách gọi API từ JavaScript (fetch, axios)
      - Xử lý lỗi và async/await
      - Best practices khi thiết kế API
      
      Kiến thức này rất quan trọng để xây dựng ứng dụng web hiện đại, kết nối frontend với backend.
    `,
        subject: "Lập trình Web nâng cao",
        createdAt: "2025-11-15T14:00:00Z",
    },
    {
        _id: "s009",
        title: "Bài học 9: Database và SQL cơ bản",
        description: "Tìm hiểu cách lưu trữ và truy vấn dữ liệu với database.",
        type: "text",
        textContent: `
      Database là nơi lưu trữ dữ liệu có cấu trúc, giúp ứng dụng quản lý thông tin một cách hiệu quả. SQL là ngôn ngữ để tương tác với database.
      
      Nội dung bài học:
      - Khái niệm về Database và DBMS
      - Các loại database: SQL vs NoSQL
      - Cấu trúc bảng, cột, hàng
      - Các lệnh SQL cơ bản: SELECT, INSERT, UPDATE, DELETE
      - WHERE clause và điều kiện
      - JOIN để kết hợp dữ liệu từ nhiều bảng
      - Index và tối ưu hóa truy vấn
      
      Hiểu về database là nền tảng để xây dựng ứng dụng có thể lưu trữ và quản lý dữ liệu người dùng.
    `,
        subject: "Cơ sở dữ liệu",
        createdAt: "2025-11-18T11:00:00Z",
    },
    {
        _id: "s010",
        title: "Bài học 10: Security và Authentication",
        description: "Học cách bảo vệ ứng dụng và xác thực người dùng.",
        type: "text",
        textContent: `
      Security là yếu tố quan trọng trong phát triển web. Bạn cần hiểu cách bảo vệ ứng dụng và dữ liệu người dùng khỏi các mối đe dọa.
      
      Bài học bao gồm:
      - Các lỗ hổng bảo mật phổ biến: XSS, SQL Injection, CSRF
      - Authentication vs Authorization
      - Password hashing và encryption
      - JWT (JSON Web Tokens)
      - Session management
      - HTTPS và SSL/TLS
      - Best practices về bảo mật
      
      Kiến thức này giúp bạn xây dựng ứng dụng an toàn, bảo vệ thông tin người dùng và tuân thủ các tiêu chuẩn bảo mật.
    `,
        subject: "Bảo mật ứng dụng",
        createdAt: "2025-11-20T15:30:00Z",
    },
];

export default async function LessonDetailPage({
    params
}: {
    params: Promise<{ id: string; sessionId: string }> | { id: string; sessionId: string }
}) {
    const resolvedParams = await params;
    const session = mockSessions[Math.floor(Math.random() * mockSessions.length)];

    return (
        <div className="p-6 mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-6">
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{session.title}</CardTitle>
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
                            <TextContentReader textContent={session.textContent} />
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
                            <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                {session.type === "video" ? "▶️ Xem lại bài học" : "📖 Đọc thêm"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5" /> Tài liệu bổ sung
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc ml-6 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="text-blue-600 hover:underline">
                                    Slide bài học {session.title}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-600 hover:underline">
                                    File ví dụ thực hành
                                </a>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="">
                <StudentChat
                    sessionId={resolvedParams.sessionId}
                    key={resolvedParams.sessionId} // Force re-render when sessionId changes
                />
            </div>
        </div>
    );
}
