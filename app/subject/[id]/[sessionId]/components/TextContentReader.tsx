"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { speak, stopSpeech } from "@/shared/lib/text-to-speech";

interface TextContentReaderProps {
    textContent: string;
}

export default function TextContentReader({ textContent }: TextContentReaderProps) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        return () => {
            stopSpeech();
        };
    }, []);

    const handleSpeak = () => {
        if (isSpeaking) {
            stopSpeech();
            setIsSpeaking(false);
        } else {
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                speak(
                    textContent,
                    "vi-VN", // Default lang, nhưng sẽ tự động phát hiện
                    () => {
                        // onStart
                        setIsSpeaking(true);
                    },
                    () => {
                        // onEnd
                        setIsSpeaking(false);
                    }
                );
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="prose max-w-none bg-gray-50 p-4 rounded-lg border">
                <p className="whitespace-pre-line">{textContent}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant={isSpeaking ? "destructive" : "default"}
                    onClick={handleSpeak}
                    className="flex items-center gap-2"
                >
                    {isSpeaking ? (
                        <>
                            <VolumeX className="h-4 w-4" />
                            Dừng đọc
                        </>
                    ) : (
                        <>
                            <Volume2 className="h-4 w-4" />
                            Đọc văn bản
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

