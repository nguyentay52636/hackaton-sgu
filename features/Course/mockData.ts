import { ApiSubject, ApiSession } from "../../app/api/types"

// Mock Sessions (Bài học)
// export const mockSessions: ApiSession[] = [
//     {
//         _id: "690f03b8393adf46917d715e",
//         title: "Bài học: Đại số 1",
//         description: "Giới thiệu về phương trình bậc nhất",
//         subject: "690f0583ef7ba95c25c864a7", // Liên kết với Toán lớp 10
//         resources: [
//             {
//                 type: "text",
//                 url: "https://example.com/lesson-text",
//                 _id: "690f0445ac87b4299a20d62e",
//             },
//             {
//                 type: "video",
//                 url: "https://example.com/lesson-video",
//                 _id: "690f0445ac87b4299a20d62f",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập 1",
//                 description: "Giải các phương trình bậc nhất",
//                 dueDate: "2025-12-15T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d630",
//             },
//             {
//                 title: "Bài tập 2",
//                 description: "Học lý thuyết và làm ví dụ 2",
//                 dueDate: "2025-12-20T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d631",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T08:47:52.802Z",
//         updatedAt: "2025-11-08T08:50:13.287Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d715f",
//         title: "Bài học: Hình học cơ bản",
//         description: "Tổng quan về các hình học cơ bản: tam giác, vuông, tròn",
//         subject: "690f0583ef7ba95c25c864a7",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/geometry-video",
//                 _id: "690f0445ac87b4299a20d632",
//             },
//             {
//                 type: "document",
//                 url: "https://example.com/geometry-pdf",
//                 _id: "690f0445ac87b4299a20d633",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập hình học",
//                 description: "Vẽ và tính diện tích các hình cơ bản",
//                 dueDate: "2025-12-18T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d634",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T09:00:00.000Z",
//         updatedAt: "2025-11-08T09:00:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d7160",
//         title: "Bài học: Phương trình bậc hai",
//         description: "Giải phương trình bậc hai và ứng dụng",
//         subject: "690f0583ef7ba95c25c864a7",
//         resources: [
//             {
//                 type: "audio",
//                 url: "https://example.com/quadratic-audio",
//                 _id: "690f0445ac87b4299a20d635",
//             },
//             {
//                 type: "text",
//                 url: "https://example.com/quadratic-text",
//                 _id: "690f0445ac87b4299a20d636",
//             },
//         ],
//         students: [],
//         assignments: [],
//         status: true,
//         createdAt: "2025-11-08T09:15:00.000Z",
//         updatedAt: "2025-11-08T09:15:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d7161",
//         title: "Bài học: Đại số nâng cao lớp 11",
//         description: "Các phương trình và hệ phương trình phức tạp",
//         subject: "690f08a27a40fc4fbbdf0b75",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/advanced-algebra-video",
//                 _id: "690f0445ac87b4299a20d637",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập nâng cao",
//                 description: "Giải các hệ phương trình phức tạp",
//                 dueDate: "2025-12-25T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d638",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T09:30:00.000Z",
//         updatedAt: "2025-11-08T09:30:00.000Z",
//         __v: 0,
//     },
//     // Thêm bài học cho Toán lớp 10
//     {
//         _id: "690f03b8393adf46917d7162",
//         title: "Bài học: Bất đẳng thức",
//         description: "Tìm hiểu về các bất đẳng thức cơ bản và nâng cao",
//         subject: "690f0583ef7ba95c25c864a7",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/inequality-video",
//                 _id: "690f0445ac87b4299a20d639",
//             },
//             {
//                 type: "document",
//                 url: "https://example.com/inequality-pdf",
//                 _id: "690f0445ac87b4299a20d63a",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập bất đẳng thức",
//                 description: "Chứng minh các bất đẳng thức cơ bản",
//                 dueDate: "2025-12-22T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d63b",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T09:45:00.000Z",
//         updatedAt: "2025-11-08T09:45:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d7163",
//         title: "Bài học: Lượng giác cơ bản",
//         description: "Hàm số lượng giác, công thức lượng giác và ứng dụng",
//         subject: "690f0583ef7ba95c25c864a7",
//         resources: [
//             {
//                 type: "audio",
//                 url: "https://example.com/trigonometry-audio",
//                 _id: "690f0445ac87b4299a20d63c",
//             },
//             {
//                 type: "text",
//                 url: "https://example.com/trigonometry-text",
//                 _id: "690f0445ac87b4299a20d63d",
//             },
//         ],
//         students: [],
//         assignments: [],
//         status: true,
//         createdAt: "2025-11-08T10:00:00.000Z",
//         updatedAt: "2025-11-08T10:00:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d7164",
//         title: "Bài học: Tổ hợp và xác suất",
//         description: "Nguyên lý đếm, hoán vị, chỉnh hợp và xác suất",
//         subject: "690f0583ef7ba95c25c864a7",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/combinatorics-video",
//                 _id: "690f0445ac87b4299a20d63e",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập tổ hợp",
//                 description: "Giải các bài toán về tổ hợp và xác suất",
//                 dueDate: "2025-12-28T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d63f",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T10:15:00.000Z",
//         updatedAt: "2025-11-08T10:15:00.000Z",
//         __v: 0,
//     },
//     // Thêm bài học cho Vật lý lớp 10
//     {
//         _id: "690f03b8393adf46917d7165",
//         title: "Bài học: Chuyển động thẳng đều",
//         description: "Khái niệm vận tốc, quãng đường và thời gian trong chuyển động thẳng đều",
//         subject: "690f05d5f8e8087b4f280080",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/motion-video",
//                 _id: "690f0445ac87b4299a20d640",
//             },
//             {
//                 type: "document",
//                 url: "https://example.com/motion-pdf",
//                 _id: "690f0445ac87b4299a20d641",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập chuyển động",
//                 description: "Giải các bài toán về chuyển động thẳng đều",
//                 dueDate: "2025-12-16T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d642",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T10:30:00.000Z",
//         updatedAt: "2025-11-08T10:30:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d7166",
//         title: "Bài học: Động lực học",
//         description: "Các định luật Newton và ứng dụng trong thực tế",
//         subject: "690f05d5f8e8087b4f280080",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/dynamics-video",
//                 _id: "690f0445ac87b4299a20d643",
//             },
//             {
//                 type: "text",
//                 url: "https://example.com/dynamics-text",
//                 _id: "690f0445ac87b4299a20d644",
//             },
//         ],
//         students: [],
//         assignments: [],
//         status: true,
//         createdAt: "2025-11-08T10:45:00.000Z",
//         updatedAt: "2025-11-08T10:45:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d7167",
//         title: "Bài học: Nhiệt động lực học",
//         description: "Nhiệt độ, nhiệt lượng và các định luật nhiệt động lực học",
//         subject: "690f05d5f8e8087b4f280080",
//         resources: [
//             {
//                 type: "audio",
//                 url: "https://example.com/thermodynamics-audio",
//                 _id: "690f0445ac87b4299a20d645",
//             },
//             {
//                 type: "document",
//                 url: "https://example.com/thermodynamics-pdf",
//                 _id: "690f0445ac87b4299a20d646",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập nhiệt động",
//                 description: "Tính toán nhiệt lượng và nhiệt độ",
//                 dueDate: "2025-12-19T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d647",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T11:00:00.000Z",
//         updatedAt: "2025-11-08T11:00:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d7168",
//         title: "Bài học: Điện học cơ bản",
//         description: "Dòng điện, điện áp, điện trở và định luật Ohm",
//         subject: "690f05d5f8e8087b4f280080",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/electricity-video",
//                 _id: "690f0445ac87b4299a20d648",
//             },
//         ],
//         students: [],
//         assignments: [],
//         status: true,
//         createdAt: "2025-11-08T11:15:00.000Z",
//         updatedAt: "2025-11-08T11:15:00.000Z",
//         __v: 0,
//     },
//     // Thêm bài học cho Toán lớp 11
//     {
//         _id: "690f03b8393adf46917d7169",
//         title: "Bài học: Hàm số lượng giác",
//         description: "Đồ thị và tính chất của các hàm số lượng giác",
//         subject: "690f08a27a40fc4fbbdf0b75",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/trig-functions-video",
//                 _id: "690f0445ac87b4299a20d649",
//             },
//             {
//                 type: "document",
//                 url: "https://example.com/trig-functions-pdf",
//                 _id: "690f0445ac87b4299a20d64a",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập hàm số lượng giác",
//                 description: "Vẽ đồ thị và khảo sát hàm số lượng giác",
//                 dueDate: "2025-12-26T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d64b",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T11:30:00.000Z",
//         updatedAt: "2025-11-08T11:30:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d716a",
//         title: "Bài học: Đạo hàm và ứng dụng",
//         description: "Khái niệm đạo hàm, quy tắc tính đạo hàm và ứng dụng",
//         subject: "690f08a27a40fc4fbbdf0b75",
//         resources: [
//             {
//                 type: "video",
//                 url: "https://example.com/derivative-video",
//                 _id: "690f0445ac87b4299a20d64c",
//             },
//             {
//                 type: "text",
//                 url: "https://example.com/derivative-text",
//                 _id: "690f0445ac87b4299a20d64d",
//             },
//         ],
//         students: [],
//         assignments: [],
//         status: true,
//         createdAt: "2025-11-08T11:45:00.000Z",
//         updatedAt: "2025-11-08T11:45:00.000Z",
//         __v: 0,
//     },
//     {
//         _id: "690f03b8393adf46917d716b",
//         title: "Bài học: Tích phân",
//         description: "Nguyên hàm, tích phân và ứng dụng trong tính diện tích",
//         subject: "690f08a27a40fc4fbbdf0b75",
//         resources: [
//             {
//                 type: "audio",
//                 url: "https://example.com/integral-audio",
//                 _id: "690f0445ac87b4299a20d64e",
//             },
//             {
//                 type: "document",
//                 url: "https://example.com/integral-pdf",
//                 _id: "690f0445ac87b4299a20d64f",
//             },
//         ],
//         students: [],
//         assignments: [
//             {
//                 title: "Bài tập tích phân",
//                 description: "Tính các tích phân cơ bản và nâng cao",
//                 dueDate: "2025-12-27T23:59:59.000Z",
//                 _id: "690f0445ac87b4299a20d650",
//             },
//         ],
//         status: true,
//         createdAt: "2025-11-08T12:00:00.000Z",
//         updatedAt: "2025-11-08T12:00:00.000Z",
//         __v: 0,
//     },
// ]

// Mock Subjects (Môn học)
// export const mockSubjects: ApiSubject[] = [
//     {
//         _id: "690f0583ef7ba95c25c864a7",
//         name: "Toán lớp 10",
//         description: "Môn Toán cơ bản lớp 10 - Đại số, Hình học, Lượng giác",
//         lessons: [
//             "690f03b8393adf46917d715e", // Đại số 1
//             "690f03b8393adf46917d715f", // Hình học cơ bản
//             "690f03b8393adf46917d7160", // Phương trình bậc hai
//             "690f03b8393adf46917d7162", // Bất đẳng thức
//             "690f03b8393adf46917d7163", // Lượng giác cơ bản
//             "690f03b8393adf46917d7164", // Tổ hợp và xác suất
//         ],
//         teacher: null,
//         status: true,
//         createdAt: "2025-11-08T08:55:31.215Z",
//         updatedAt: "2025-11-08T08:55:31.215Z",
//         __v: 0,
//     },
//     {
//         _id: "690f05d5f8e8087b4f280080",
//         name: "Vật lý lớp 10",
//         description: "Môn Vật lý cơ bản lớp 10 - Cơ học, Nhiệt học, Điện học",
//         lessons: [
//             "690f03b8393adf46917d7165", // Chuyển động thẳng đều
//             "690f03b8393adf46917d7166", // Động lực học
//             "690f03b8393adf46917d7167", // Nhiệt động lực học
//             "690f03b8393adf46917d7168", // Điện học cơ bản
//         ],
//         teacher: null,
//         status: true,
//         createdAt: "2025-11-08T08:56:53.309Z",
//         updatedAt: "2025-11-08T08:56:53.309Z",
//         __v: 0,
//     },
//     {
//         _id: "690f08a27a40fc4fbbdf0b75",
//         name: "Toán lớp 11",
//         description: "Môn Toán cơ bản lớp 11 - Đại số, Giải tích, Lượng giác",
//         lessons: [
//             "690f03b8393adf46917d7161", // Đại số nâng cao
//             "690f03b8393adf46917d7169", // Hàm số lượng giác
//             "690f03b8393adf46917d716a", // Đạo hàm và ứng dụng
//             "690f03b8393adf46917d716b", // Tích phân
//         ],
//         teacher: null,
//         status: true,
//         createdAt: "2025-11-08T09:08:50.517Z",
//         updatedAt: "2025-11-08T09:08:50.517Z",
//         __v: 0,
//     },
// ]

