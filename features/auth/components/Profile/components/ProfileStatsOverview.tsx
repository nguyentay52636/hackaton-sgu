"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Clock, FileText, Trophy } from "lucide-react"
import type { UserStats } from "./types"
import { formatTime } from "./utils"

interface ProfileStatsOverviewProps {
    stats: UserStats
}

export function ProfileStatsOverview({ stats }: ProfileStatsOverviewProps) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{formatTime(stats.totalTime)}</p>
                            <p className="text-sm text-muted-foreground">Thời gian học</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.transcriptCount}</p>
                            <p className="text-sm text-muted-foreground">Bản ghi chú</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.wordsLearned}</p>
                            <p className="text-sm text-muted-foreground">Từ đã học</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

