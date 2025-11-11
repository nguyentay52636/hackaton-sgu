"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Mic, MessageSquare, FileText, TrendingUp } from "lucide-react"
import type { UserStats } from "./types"

interface ProfileStatsDetailedProps {
    stats: UserStats
}

export function ProfileStatsDetailed({ stats }: ProfileStatsDetailedProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Thống kê chi tiết
                </CardTitle>
                <CardDescription>Tổng quan hoạt động học tập của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Mic className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="font-medium">Luyện phát âm</p>
                                <p className="text-sm text-muted-foreground">Số lần thực hành</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                            {stats.practiceCount}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="font-medium">Trò chuyện với AI</p>
                                <p className="text-sm text-muted-foreground">Số tin nhắn</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                            {stats.chatCount}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="font-medium">Buổi học</p>
                                <p className="text-sm text-muted-foreground">Tổng số buổi</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                            {stats.totalSessions}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

