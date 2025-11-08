"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { Badge } from "@/shared/ui/badge"
import { Download, BookOpen, Star, Volume2, Copy, X, ArrowLeftRight } from "lucide-react"
import { SavedWord } from "../types"
import { LANGUAGES } from "../constants"

interface SavedWordsTabProps {
    savedWords: SavedWord[]
    onExport: () => void
    onToggleFavorite: (id: string) => void
    onDelete: (id: string) => void
    onSpeak: (text: string, lang: string) => void
    onCopy: (text: string) => void
}

export function SavedWordsTab({
    savedWords,
    onExport,
    onToggleFavorite,
    onDelete,
    onSpeak,
    onCopy,
}: SavedWordsTabProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredSavedWords = savedWords.filter(
        (w) =>
            w.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
            w.translation.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Sổ từ vựng</CardTitle>
                        <CardDescription>{savedWords.length} từ đã lưu</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        {savedWords.length > 0 && (
                            <Button variant="outline" size="sm" onClick={onExport}>
                                <Download className="w-4 h-4 mr-2" />
                                Xuất file
                            </Button>
                        )}
                    </div>
                </div>
                {savedWords.length > 0 && (
                    <div className="pt-4">
                        <Input
                            placeholder="Tìm từ vựng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-md"
                        />
                    </div>
                )}
            </CardHeader>
            <CardContent>
                {filteredSavedWords.length > 0 ? (
                    <ScrollArea className="h-[600px] pr-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {filteredSavedWords.map((word) => (
                                <Card key={word.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="pt-4">
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {LANGUAGES.find((l) => l.code === word.fromLang)?.flag}
                                                        </Badge>
                                                        <ArrowLeftRight className="w-3 h-3" />
                                                        <Badge variant="secondary" className="text-xs">
                                                            {LANGUAGES.find((l) => l.code === word.toLang)?.flag}
                                                        </Badge>
                                                    </div>
                                                    <p className="font-semibold text-lg mb-1 truncate">
                                                        {word.original}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground mb-3 truncate">
                                                        {word.translation}
                                                    </p>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => onToggleFavorite(word.id)}
                                                    className="shrink-0"
                                                >
                                                    <Star
                                                        className={`w-4 h-4 ${
                                                            word.isFavorite ? "fill-yellow-400 text-yellow-400" : ""
                                                        }`}
                                                    />
                                                </Button>
                                            </div>

                                            {word.examples.length > 0 && (
                                                <div className="space-y-1">
                                                    {word.examples.slice(0, 1).map((example, i) => (
                                                        <p
                                                            key={i}
                                                            className="text-xs text-muted-foreground pl-3 border-l-2 line-clamp-2"
                                                        >
                                                            {example}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between pt-2 border-t">
                                                <div className="flex gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => onSpeak(word.original, word.fromLang)}
                                                    >
                                                        <Volume2 className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => onCopy(word.original)}
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                                <Button size="sm" variant="ghost" onClick={() => onDelete(word.id)}>
                                                    <X className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                            <BookOpen className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            {searchQuery ? "Không tìm thấy" : "Chưa có từ nào"}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            {searchQuery
                                ? "Thử tìm kiếm với từ khóa khác"
                                : "Dịch và lưu các từ mới để xây dựng sổ từ vựng của bạn"}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

