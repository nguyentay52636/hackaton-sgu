export interface UserProfile {
    name: string
    email: string
    avatar: string
    joinDate: Date
    language: "vi" | "en"
}

export interface UserStats {
    totalSessions: number
    totalTime: number
    transcriptCount: number
    chatCount: number
    practiceCount: number
    wordsLearned: number
}

