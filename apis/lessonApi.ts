import baseApi from "./baseApi"

export interface LessonResource {
    type: "video" | "audio" | "document" | "text"
    url: string
    _id: string
}

export interface LessonSubject {
    _id: string
    name: string
}

export interface Lesson {  
    _id: string
    title?: string
    name?: string
    description: string
    subject: LessonSubject | null
    resources: LessonResource[]
    students: Array<{ _id: string; name: string; email: string }>
    assignments: Assignment[]
    status: boolean
    createdAt: string
    updatedAt: string
    __v: number
} 

export interface LessonType { 
    type: "video" | "audio" | "document" | "text"
    url: string
    _id?: string
}

export interface Assignment { 
    _id?: string
    title: string
    description: string
    dueDate: Date

} 
export const getAllLessons = async () => {  
try {
const {data} = await baseApi.get<Lesson[]>('/lesson/');
    return data
} catch (error) {
    console.error('Error fetching lessons:', error)
    throw error
}}
export const getLessonById = async (id: string) => {
    try {
        const {data} = await baseApi.get<Lesson>(`/lesson/${id}`)
        return data
    } catch (error) {
        console.error('Error fetching lesson:', error)
        throw error
    }
}
export const createLesson = async (lesson: Partial<Lesson>) => {
    try {
        const {data} = await baseApi.post<Lesson>('/lesson/', lesson)
        return data
    } catch (error) {
        console.error('Error creating lesson:', error)
        throw error
    }
}

export const updateLesson = async (id: string, lesson: Partial<Lesson>) => {
    try {
        const {data} = await baseApi.put<Lesson>(`/lesson/${id}`, lesson)
        return data
    } catch (error) {
        console.error('Error updating lesson:', error)
        throw error
    }
}
export const deleteLesson = async (id: string) => {
    try {
        const {data} = await baseApi.delete<Lesson>(`/lesson/${id}`)
        return data
    } catch (error) {
        console.error('Error deleting lesson:', error)
        throw error
    }
}