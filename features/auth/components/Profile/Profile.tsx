"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { ProfileHeader } from "./components/ProfileHeader"
import { ProfileInfoCard } from "./components/ProfileInfoCard"
import { ProfileStatsOverview } from "./components/ProfileStatsOverview"
import { ProfileStatsDetailed } from "./components/ProfileStatsDetailed"
import { ProfileAchievements } from "./components/ProfileAchievements"
import { DeleteDataDialog } from "./components/DeleteDataDialog"
import type { UserProfile, UserStats } from "./components/types"

export function Profile() {
    const [profile, setProfile] = useState<UserProfile>({
        name: "Học sinh",
        email: "",
        avatar: "",
        joinDate: new Date(),
        language: "vi",
    })
    const [stats, setStats] = useState<UserStats>({
        totalSessions: 0,
        totalTime: 0,
        transcriptCount: 0,
        chatCount: 0,
        practiceCount: 0,
        wordsLearned: 0,
    })
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        loadProfile()
        loadStats()
    }, [])

    const loadProfile = () => {
        const saved = localStorage.getItem("user-profile")
        if (saved) {
            const parsed = JSON.parse(saved)
            setProfile({
                ...parsed,
                joinDate: new Date(parsed.joinDate),
            })
        }
    }

    const loadStats = () => {
        // Load transcript count
        const sessions = localStorage.getItem("transcript-sessions")
        const transcriptCount = sessions ? JSON.parse(sessions).length : 0

        // Load saved words count
        const words = localStorage.getItem("saved-words")
        const wordsLearned = words ? JSON.parse(words).length : 0

        // Simulate other stats (in real app, these would be tracked)
        setStats({
            totalSessions: transcriptCount + Math.floor(Math.random() * 10),
            totalTime: transcriptCount * 15 + Math.floor(Math.random() * 100),
            transcriptCount,
            chatCount: Math.floor(Math.random() * 50),
            practiceCount: Math.floor(Math.random() * 30),
            wordsLearned,
        })
    }


    const deleteAllData = () => {
        localStorage.clear()
        setShowDeleteDialog(false)
        toast({
            title: "Đã xóa tất cả",
            description: "Toàn bộ dữ liệu đã được xóa",
        })
        window.location.href = "/"
    }

    const downloadData = () => {
        const data = {
            profile,
            stats,
            transcripts: localStorage.getItem("transcript-sessions"),
            words: localStorage.getItem("saved-words"),
            settings: localStorage.getItem("accessibility-settings"),
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "learnassist-data.json"
        a.click()
        URL.revokeObjectURL(url)

        toast({
            title: "Đã tải xuống",
            description: "Dữ liệu đã được lưu về máy",
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
            <ProfileHeader />

            <div className="container mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    <ProfileInfoCard
                        profile={profile}
                        onProfileChange={(updatedProfile) => {
                            setProfile(updatedProfile)
                            localStorage.setItem("user-profile", JSON.stringify(updatedProfile))
                        }}
                        onDownloadData={downloadData}
                        onDeleteClick={() => setShowDeleteDialog(true)}
                    />

                    <div className="lg:col-span-2 space-y-6">
                        <ProfileStatsOverview stats={stats} />
                        <ProfileStatsDetailed stats={stats} />
                        <ProfileAchievements stats={stats} />
                    </div>
                </div>
            </div>

            <DeleteDataDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onConfirm={deleteAllData}
            />
        </div>
    )
}
