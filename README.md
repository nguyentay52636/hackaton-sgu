# 🎓 Hệ thống Học tập Hòa nhập với AI

![Node.js 20](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)]()
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)]()

---

## 🚀 Giới thiệu

**Hệ thống Học tập Hòa nhập với AI** là nền tảng học tập thông minh được thiết kế đặc biệt để hỗ trợ người học có nhu cầu đặc biệt, đặc biệt là người khiếm thính. Hệ thống tích hợp công nghệ AI tiên tiến để chuyển đổi giọng nói-văn bản, chatbot học tập thông minh và các công cụ hỗ trợ trợ năng.

### 🎯 Mục tiêu

- 🗣️ **Chuyển đổi giọng nói-văn bản**: Ghi âm giọng nói và tự động chuyển thành văn bản theo thời gian thực
- 🔊 **Chuyển đổi văn bản-giọng nói**: Đọc nội dung văn bản bằng giọng nói AI, hỗ trợ người khiếm thính tiếp cận thông tin
- 💬 **Chatbot học tập AI**: Trợ lý học tập thông minh, trả lời câu hỏi và hỗ trợ học sinh
- 📝 **Phụ đề tự động**: Hiển thị phụ đề theo thời gian thực trong lớp học và video
- ♿ **Hỗ trợ trợ năng**: Tùy chỉnh kích thước chữ, độ tương phản, highlight theo giọng đọc
- 📚 **Quản lý khóa học**: Hệ thống môn học, bài học với tích hợp AI

---

## 🛠️ Công nghệ sử dụng

| Phần | Công nghệ |
|------|-----------|
| **Frontend Framework** | Next.js 16 (React 19 App Router), TypeScript |
| **UI/UX** | TailwindCSS, Radix UI, Framer Motion |
| **AI & Speech** | OpenAI Whisper (STT), Google Cloud TTS, OpenRouter API |
| **State Management** | Zustand, Redux Toolkit |
| **Internationalization** | next-intl, i18next |
| **Real-time** | Socket.io Client |
| **Audio Processing** | @jambonz/lamejs, Web Audio API |
| **Maps** | Leaflet, React Leaflet |

---

## ✨ Tính năng chính

### 🎤 Chuyển đổi Giọng nói - Văn bản (STT)
- Ghi âm giọng nói theo thời gian thực
- Tích hợp OpenAI Whisper API
- Hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh)
- Hiển thị transcript với timestamp

### 🔊 Chuyển đổi Văn bản - Giọng nói (TTS)
- Đọc văn bản bằng giọng nói AI
- Tùy chỉnh giọng nam/nữ, tốc độ đọc
- Highlight từng từ khi đọc
- Hỗ trợ đa ngôn ngữ

### 💬 Chatbot Học tập AI
- Tích hợp OpenRouter API
- Hiểu context bài học
- Trả lời câu hỏi thông minh
- Hỗ trợ nhập bằng giọng nói hoặc văn bản

### 📝 Phụ đề & Captions
- Phụ đề tự động cho video
- Real-time captions trong lớp học trực tuyến
- Tùy chỉnh hiển thị phụ đề

### ♿ Tính năng Trợ năng
- Tùy chỉnh kích thước chữ
- Điều chỉnh độ tương phản
- Highlight text theo giọng đọc
- Dark mode / Light mode
- Keyboard navigation

### 📚 Quản lý Khóa học
- Quản lý môn học và bài học
- Theo dõi tiến độ học tập
- Tích hợp chatbot trong từng bài học
- Workspace học tập cá nhân

### 🌐 Đa ngôn ngữ
- Hỗ trợ Tiếng Việt và Tiếng Anh
- Dịch nội dung tự động
- Giao diện đa ngôn ngữ

---

## ⚡ Cấu trúc dự án

```bash
📦 frontend
 ├── 📂 app/                    # Next.js App Router
 │   ├── 📂 [locale]/          # Internationalization routes
 │   ├── 📂 api/               # API routes (STT, TTS, Chatbot)
 │   ├── 📂 auth/              # Authentication pages
 │   ├── 📂 subject/           # Course/Subject pages
 │   └── 📂 workspace/         # Learning workspace
 │
 ├── 📂 features/              # Feature modules
 │   ├── 📂 auth/              # Authentication
 │   ├── 📂 Course/            # Course management
 │   ├── 📂 main/              # Main features (Translator, Chat)
 │   ├── 📂 workspace/         # Workspace components
 │   └── 📂 admin/              # Admin panel
 │
 ├── 📂 shared/                # Shared components & utilities
 │   ├── 📂 components/        # Reusable components
 │   ├── 📂 ui/                # UI components (shadcn/ui)
 │   └── 📂 lib/               # Utilities (TTS, STT, etc.)
 │
 ├── 📂 hooks/                 # Custom React hooks
 │   ├── use-audio-recorder.tsx
 │   └── use-text-to-speech.tsx
 │
 ├── 📂 apis/                  # API client functions
 ├── 📂 redux/                 # Redux store & slices
 └── 📂 stores/                # Zustand stores
```

---

## 🚀 Cài đặt & Chạy

### Yêu cầu
- Node.js 20+
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone <repository-url>

# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install
```

### Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

### Build Production

```bash
npm run build
npm start
```

---

## 🔧 Cấu hình

### Biến môi trường

Tạo file `.env.local` với các biến sau:

```env
# API Endpoints
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WHISPER_API_URL=http://localhost:5000/api/stt/whisper

# OpenRouter API (cho Chatbot)
OPENROUTER_API_KEY=your_openrouter_api_key

# Google Cloud TTS (nếu sử dụng)
GOOGLE_CLOUD_TTS_KEY=your_google_cloud_key
```

---

## 📖 Hướng dẫn sử dụng

### Cho Người học

1. **Đăng nhập/Đăng ký**: Tạo tài khoản để bắt đầu học
2. **Chọn môn học**: Xem danh sách môn học và chọn môn muốn học
3. **Học bài**: 
   - Xem nội dung bài học
   - Sử dụng chatbot để đặt câu hỏi
   - Bật TTS để nghe nội dung
   - Sử dụng STT để nhập bằng giọng nói
4. **Workspace**: Ghi âm, chuyển đổi văn bản, tạo ghi chú

### Cho Giáo viên/Admin

1. Đăng nhập với quyền admin
2. Quản lý môn học, bài học
3. Xem thống kê học tập
4. Quản lý người dùng

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

---

## 👥 Đội ngũ phát triển

Dự án được phát triển với mục tiêu hỗ trợ giáo dục hòa nhập, giúp mọi người đều có cơ hội tiếp cận giáo dục chất lượng.
The code Exhibit <3>
---
