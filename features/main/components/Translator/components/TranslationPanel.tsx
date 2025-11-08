"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Sparkles, Volume2, Copy, Check, Save, Languages } from "lucide-react"

interface TranslationPanelProps {
    translatedText: string
    isTranslating: boolean
    copied: boolean
    onSpeak: () => void
    onCopy: () => void
    onSave: () => void
}

export function TranslationPanel({
    translatedText,
    isTranslating,
    copied,
    onSpeak,
    onCopy,
    onSave,
}: TranslationPanelProps) {
    return (
        <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-500" />
                        <CardTitle className="text-lg">Bản dịch</CardTitle>
                    </div>
                    <div className="flex gap-2">
                        {translatedText && (
                            <>
                                <Button size="sm" variant="ghost" onClick={onSpeak}>
                                    <Volume2 className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={onCopy}>
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </Button>
                                <Button size="sm" variant="ghost" onClick={onSave}>
                                    <Save className="w-4 h-4" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {translatedText ? (
                    <div className="min-h-[320px] p-4 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">{translatedText}</p>
                    </div>
                ) : (
                    <div className="min-h-[320px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
                        <div className="text-center space-y-3 p-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto">
                                <Languages className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium mb-1">Bản dịch sẽ hiển thị tại đây</p>
                                <p className="text-sm text-muted-foreground">
                                    Nhập văn bản để dịch tự động hoặc nhấn nút Dịch
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {isTranslating && (
                    <div className="flex items-center justify-center pt-2">
                        <Sparkles className="w-4 h-4 animate-spin text-cyan-500 mr-2" />
                        <span className="text-sm text-muted-foreground">Đang dịch...</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

