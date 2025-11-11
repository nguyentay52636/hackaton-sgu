"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Trophy } from "lucide-react"
import type { UserStats } from "./types"

interface ProfileAchievementsProps {
    stats: UserStats
}

export function ProfileAchievements({ stats }: ProfileAchievementsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Thành tựu
                </CardTitle>
                <CardDescription>Những cột mốc bạn đã đạt được</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                    {stats.transcriptCount >= 1 && (
                        <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                            <div className="text-3xl mb-2">🎯</div>
                            <p className="font-semibold">Khởi đầu</p>
                            <p className="text-xs text-muted-foreground">Hoàn thành buổi học đầu tiên</p>
                        </div>
                    )}

                    {stats.wordsLearned >= 10 && (
                        <div className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                            <div className="text-3xl mb-2">📚</div>
                            <p className="font-semibold">Người sưu tầm</p>
                            <p className="text-xs text-muted-foreground">Học 10+ từ vựng mới</p>
                        </div>
                    )}

                    {stats.totalTime >= 60 && (
                        <div className="p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                            <div className="text-3xl mb-2">⏰</div>
                            <p className="font-semibold">Kiên trì</p>
                            <p className="text-xs text-muted-foreground">Học hơn 1 giờ</p>
                        </div>
                    )}

                    {stats.practiceCount >= 5 && (
                        <div className="p-4 border rounded-lg bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20">
                            <div className="text-3xl mb-2">🎤</div>
                            <p className="font-semibold">Diễn giả</p>
                            <p className="text-xs text-muted-foreground">Luyện phát âm 5+ lần</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

