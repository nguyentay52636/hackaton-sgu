// API Response Types
export interface ApiResource {
    type: "text" | "video" | "audio" | "document"
    url: string
    _id: string
}

export interface ApiAssignment {
    title: string
    description: string
    dueDate: string
    _id: string
}

export interface ApiSession {
    _id: string
    title: string
    description: string
    subject: string | null
    resources: ApiResource[]
    students: string[]
    assignments: ApiAssignment[]
    status: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export interface ApiSubject {
    _id: string
    name: string
    description: string
    lessons: string[] // Array of lesson IDs
    teacher: string | null
    status: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export interface ApiChatMessage {
    sender: "student" | "AI"
    message: string
    _id: string
    timestamp: string
}

export interface ApiChatHistory {
    _id: string
    user: string | null
    messages: ApiChatMessage[]
    topic: string
    createdAt: string
    updatedAt: string
    __v: number
}

// Display Types
export type LessonStatus = "locked" | "active" | "completed"
export type LessonType = "video" | "audio" | "document" | "text"

export interface Lesson {
    id: string
    title: string
    duration: string
    status: LessonStatus
    type: LessonType
    description?: string
    resourceUrl?: string
    assignments?: ApiAssignment[]
}

export interface SubjectDetail {
    id: string
    name: string
    description: string
    image: string
    progress: number
    status: "active" | "completed"
    lessons: Lesson[]
}

export interface SubjectCardData {
    id: string
    name: string
    description: string
    lessons: number
    status: "active" | "completed"
    image: string
    progress: number
}

