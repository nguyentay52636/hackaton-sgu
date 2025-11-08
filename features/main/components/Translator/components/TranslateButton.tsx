"use client"

import { Button } from "@/shared/ui/button"
import { Languages, Sparkles } from "lucide-react"

interface TranslateButtonProps {
    isTranslating: boolean
    disabled: boolean
    onClick: () => void
}

export function TranslateButton({ isTranslating, disabled, onClick }: TranslateButtonProps) {
    return (
        <div className="flex justify-center">
            <Button
                onClick={onClick}
                disabled={disabled}
                size="lg"
                className="min-w-[240px] h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
                {isTranslating ? (
                    <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Đang dịch...
                    </>
                ) : (
                    <>
                        <Languages className="w-5 h-5 mr-2" />
                        Dịch ngay
                    </>
                )}
            </Button>
        </div>
    )
}

