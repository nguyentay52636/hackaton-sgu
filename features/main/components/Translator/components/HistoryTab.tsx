"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { Badge } from "@/shared/ui/badge"
import { X, Clock, ArrowLeftRight } from "lucide-react"
import { TranslationHistory } from "../types"
import { LANGUAGES } from "../constants"

interface HistoryTabProps {
    history: TranslationHistory[]
    onClear: () => void
    onSelectHistoryItem: (item: TranslationHistory) => void
}

export function HistoryTab({ history, onClear, onSelectHistoryItem }: HistoryTabProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Lịch sử dịch</CardTitle>
                        <CardDescription>{history.length} bản dịch gần đây</CardDescription>
                    </div>
                    {history.length > 0 && (
                        <Button variant="outline" size="sm" onClick={onClear}>
                            <X className="w-4 h-4 mr-2" />
                            Xóa tất cả
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {history.length > 0 ? (
                    <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-3">
                            {history.map((item) => (
                                <Card
                                    key={item.id}
                                    className="hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => onSelectHistoryItem(item)}
                                >
                                    <CardContent className="pt-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Badge variant="secondary">
                                                    {LANGUAGES.find((l) => l.code === item.fromLang)?.flag}
                                                </Badge>
                                                <ArrowLeftRight className="w-3 h-3" />
                                                <Badge variant="secondary">
                                                    {LANGUAGES.find((l) => l.code === item.toLang)?.flag}
                                                </Badge>
                                                <span className="ml-auto">
                                                    {new Date(item.timestamp).toLocaleString("vi-VN")}
                                                </span>
                                            </div>
                                            <div className="grid gap-2">
                                                <p className="font-medium line-clamp-2">{item.original}</p>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {item.translation}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Clock className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Chưa có lịch sử</h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Lịch sử dịch của bạn sẽ được lưu tự động ở đây
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

