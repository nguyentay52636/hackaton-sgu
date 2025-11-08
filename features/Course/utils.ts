import { ApiSession, ApiSubject, Lesson, SubjectDetail, SubjectCardData, LessonType, LessonStatus } from "../../app/api/types"
import { Lesson as ApiLesson, LessonResource } from "../../apis/lessonApi"

/**
 * Determine lesson type from resources
 */
function getLessonType(resources: ApiSession["resources"]): LessonType {
    if (resources.length === 0) return "text"
    
    // Priority: video > audio > document > text
    const hasVideo = resources.some(r => r.type === "video")
    if (hasVideo) return "video"
    
    const hasAudio = resources.some(r => r.type === "audio")
    if (hasAudio) return "audio"
    
    const hasDocument = resources.some(r => r.type === "document")
    if (hasDocument) return "document"
    
    return "text"
}

/**
 * Get primary resource URL for lesson
 */
function getPrimaryResourceUrl(resources: ApiSession["resources"], type: LessonType): string | undefined {
    const resource = resources.find(r => r.type === type)
    if (resource) return resource.url
    
    // Fallback to first resource
    return resources[0]?.url
}

/**
 * Determine lesson status based on completion logic
 * This is a placeholder - you may need to integrate with actual student progress
 */
function getLessonStatus(session: ApiSession, index: number, totalLessons: number): LessonStatus {
    // If lesson is not active, it's locked
    if (!session.status) return "locked"
    
    // First lesson is always active or completed
    if (index === 0) {
        // You can check actual completion status here
        return "active" // or "completed" based on student progress
    }
    
    // For now, we'll use a simple logic: first lesson active, others locked
    // You should replace this with actual student progress tracking
    return index === 0 ? "active" : "locked"
}

/**
 * Calculate estimated duration for a lesson
 * This is a placeholder - you may need actual duration from resources
 */
function estimateDuration(resources: ApiSession["resources"]): string {
    // Default duration based on resource type
    const type = getLessonType(resources)
    const durations: Record<LessonType, string> = {
        video: "25 phút",
        audio: "30 phút",
        document: "20 phút",
        text: "15 phút",
    }
    return durations[type]
}

/**
 * Transform API Session to Lesson display format
 */
export function transformSessionToLesson(session: ApiSession, index: number, totalLessons: number): Lesson {
    const type = getLessonType(session.resources)
    const status = getLessonStatus(session, index, totalLessons)
    
    return {
        id: session._id,
        title: session.title,
        duration: estimateDuration(session.resources),
        status,
        type,
        description: session.description,
        resourceUrl: getPrimaryResourceUrl(session.resources, type),
        assignments: session.assignments.length > 0 ? session.assignments : undefined,
    }
}

/**
 * Transform API Subject with Sessions to SubjectDetail
 */
export function transformSubjectToDetail(
    subject: ApiSubject,
    sessions: ApiSession[],
    image?: string
): SubjectDetail {
    // Filter sessions that belong to this subject
    const subjectSessions = sessions.filter(s => 
        s.subject === subject._id || (s.subject === null && subject.lessons.includes(s._id))
    )
    
    // Transform sessions to lessons
    const lessons = subjectSessions.map((session, index) => 
        transformSessionToLesson(session, index, subjectSessions.length)
    )
    
    // Calculate progress (placeholder - should use actual student progress)
    const completedLessons = lessons.filter(l => l.status === "completed").length
    const progress = lessons.length > 0 
        ? Math.round((completedLessons / lessons.length) * 100) 
        : 0
    
    // Determine status
    const status: "active" | "completed" = progress === 100 ? "completed" : "active"
    
    return {
        id: subject._id,
        name: subject.name,
        description: subject.description,
        image: image || "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress,
        status,
        lessons,
    }
}

/**
 * Transform API Subject to SubjectCardData
 */
export function transformSubjectToCard(
    subject: ApiSubject,
    sessions: ApiSession[],
    image?: string
): SubjectCardData {
    // Count lessons for this subject
    const subjectSessions = sessions.filter(s => 
        s.subject === subject._id || (s.subject === null && subject.lessons.includes(s._id))
    )
    
    // Calculate progress (placeholder - should use actual student progress)
    const completedLessons = subjectSessions.filter(s => s.status).length
    const progress = subjectSessions.length > 0 
        ? Math.round((completedLessons / subjectSessions.length) * 100) 
        : 0
    
    // Determine status
    const status: "active" | "completed" = progress === 100 ? "completed" : "active"
    
    return {
        id: subject._id,
        name: subject.name,
        description: subject.description,
        lessons: subjectSessions.length,
        status,
        image: image || "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress,
    }
}

/**
 * Determine lesson type from resources (for API Lesson)
 */
function getLessonTypeFromResources(resources: LessonResource[]): LessonType {
    if (resources.length === 0) return "text"
    
    // Priority: video > audio > document > text
    const hasVideo = resources.some(r => r.type === "video")
    if (hasVideo) return "video"
    
    const hasAudio = resources.some(r => r.type === "audio")
    if (hasAudio) return "audio"
    
    const hasDocument = resources.some(r => r.type === "document")
    if (hasDocument) return "document"
    
    return "text"
}

/**
 * Get primary resource URL for lesson (for API Lesson)
 */
function getPrimaryResourceUrlFromResources(resources: LessonResource[], type: LessonType): string | undefined {
    const resource = resources.find(r => r.type === type)
    if (resource) return resource.url
    
    // Fallback to first resource
    return resources[0]?.url
}

/**
 * Calculate estimated duration for a lesson (for API Lesson)
 */
function estimateDurationFromResources(resources: LessonResource[]): string {
    const type = getLessonTypeFromResources(resources)
    const durations: Record<LessonType, string> = {
        video: "25 phút",
        audio: "30 phút",
        document: "20 phút",
        text: "15 phút",
    }
    return durations[type]
}

/**
 * Determine lesson status from API lesson
 */
function getLessonStatusFromApi(apiLesson: ApiLesson, index: number, totalLessons: number): LessonStatus {
    // If lesson is not active, it's locked
    if (!apiLesson.status) return "locked"
    
    // First lesson is always active
    if (index === 0) {
        return "active"
    }
    
    // For now, we'll use a simple logic: first lesson active, others locked
    // You should replace this with actual student progress tracking
    return index === 0 ? "active" : "locked"
}

/**
 * Transform API Lesson to display format
 */
export function transformApiLessonToDisplay(apiLesson: ApiLesson, index: number, totalLessons: number): Lesson {
    const type = getLessonTypeFromResources(apiLesson.resources)
    const status = getLessonStatusFromApi(apiLesson, index, totalLessons)
    const title = apiLesson.title || apiLesson.name || "Bài học không có tiêu đề"
    
    return {
        id: apiLesson._id,
        title,
        duration: estimateDurationFromResources(apiLesson.resources),
        status,
        type,
        description: apiLesson.description,
        resourceUrl: getPrimaryResourceUrlFromResources(apiLesson.resources, type),
        assignments: apiLesson.assignments.length > 0 ? apiLesson.assignments : [undefined],
    }
}

/**
 * Transform Subject with API Lessons to SubjectDetail
 */
export function transformSubjectWithApiLessons(
    subject: { _id?: string; name: string; description: string; lessons?: any },
    apiLessons: ApiLesson[],
    image?: string
): SubjectDetail {
    // Extract lesson IDs from subject.lessons (could be string[] or object[])
    const lessonIds: string[] = subject.lessons 
        ? subject.lessons.map((lesson: any) => typeof lesson === 'string' ? lesson : lesson._id || lesson.id)
        : []
    
    // Filter lessons that belong to this subject
    const subjectLessons = apiLessons.filter(lesson => {
        // Check if lesson.subject is an object with matching _id
        if (lesson.subject && typeof lesson.subject === 'object' && lesson.subject._id === subject._id) {
            return true
        }
        // Check if lesson.subject is null and lesson ID is in subject.lessons array
        if (lesson.subject === null && lessonIds.includes(lesson._id)) {
            return true
        }
        return false
    })
    
    // Transform API lessons to display format
    const lessons = subjectLessons.map((apiLesson, index) => 
        transformApiLessonToDisplay(apiLesson, index, subjectLessons.length)
    )
    
    // Calculate progress (placeholder - should use actual student progress)
    const completedLessons = lessons.filter(l => l.status === "completed").length
    const progress = lessons.length > 0 
        ? Math.round((completedLessons / lessons.length) * 100) 
        : 0
    
    // Determine status
    const status: "active" | "completed" = progress === 100 ? "completed" : "active"
    
    return {
        id: subject._id || "",
        name: subject.name,
        description: subject.description,
        image: image || "https://cdn2.fptshop.com.vn/unsafe/800x0/hoc_lap_trinh_web_1_271d0d3190.jpg",
        progress,
        status,
        lessons,
    }
}

/**
 * Calculate course statistics from subjects and sessions
 */
export function calculateCourseStats(subjects: ApiSubject[], sessions: ApiSession[]) {
    const activeSubjects = subjects.filter(s => s.status).length
    const totalLessons = sessions.filter(s => s.status).length
    const completedLessons = sessions.filter(s => {
        // This should check actual student completion
        // For now, using status as placeholder
        return s.status
    }).length
    
    // Calculate total hours (placeholder - should use actual duration)
    const estimatedHours = (totalLessons * 0.5).toFixed(1) // Assuming 30 min per lesson
    
    return {
        activeSubjects,
        totalLessons,
        completedLessons,
        estimatedHours,
    }
}

