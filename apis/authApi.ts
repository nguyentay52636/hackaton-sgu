
export interface User {
    id: string
    name: string
    email?: string
    role: UserRole
    avatar?: string
    grade?: string
    classId?: string
    specialNeeds?: string[]
    createdAt: Date
    lastActive: Date
}
export type UserRole = "student" | "teacher" | "admin" | "guest"    