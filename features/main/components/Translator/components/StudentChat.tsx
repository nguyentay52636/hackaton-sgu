"use client";

import { useState, useEffect, useRef } from "react";
import { Send, MessageCircle, User, Voicemail, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";

export default function StudentChat() {
    const [messages, setMessages] = useState<
        { id: number; user: string; text: string; time: string }[]
    >([
        { id: 1, user: "An", text: "Mọi người xem tới đoạn 3:15 chưa? 😆", time: "18:32" },
        { id: 2, user: "Hà", text: "Đoạn đó thầy ví dụ rất dễ hiểu.", time: "18:33" },
        { id: 2, user: "Hà", text: "Đoạn đó thầy ví dụ rất dễ hiểu.", time: "18:33" },
        { id: 2, user: "Hà", text: "Đoạn đó thầy ví dụ rất dễ hiểu.", time: "18:33" },
        { id: 2, user: "Hà", text: "Đoạn đó thầy ví dụ rất dễ hiểu.", time: "18:33" },
    ]);
    const [newMsg, setNewMsg] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const chatRef = useRef<HTMLDivElement>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages]);

    useEffect(() => {
        if (isRecording) {
            timerIntervalRef.current = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        } else {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        }

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [isRecording]);

    useEffect(() => {
        if (!isRecording) {
            setElapsedTime(0);
        }
    }, [isRecording]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleVoiceCall = () => {
        if (isRecording) {
            setIsRecording(false);
            console.log("Stopped recording, duration:", formatTime(elapsedTime));
        } else {
            // Bắt đầu recording
            setIsRecording(true);
            setElapsedTime(0);
            console.log("Started recording");
        }
    };

    const handleSend = () => {
        if (newMsg.trim().length === 0) return;

        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
        const newMessage = { id: Date.now(), user: "Bạn", text: newMsg, time };

        setMessages((prev) => [...prev, newMessage]);
        setNewMsg("");
    };

    const getInitials = (name: string) => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <Card className="h-full flex flex-col border-l bg-card/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-semibold">Thảo luận lớp học</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {messages.length}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-4 flex flex-col flex-1 min-h-0">
                <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30"
                >
                    {messages.map((msg) => {
                        const isOwn = msg.user === "Bạn";
                        return (
                            <div
                                key={msg.id}
                                className={`flex items-start gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shadow-sm ${isOwn
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {isOwn ? (
                                        <User className="h-4 w-4" />
                                    ) : (
                                        <span>{getInitials(msg.user)}</span>
                                    )}
                                </div>

                                {/* Message bubble */}
                                <div className={`flex flex-col max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-muted-foreground">{msg.user}</span>
                                        <span className="text-xs text-muted-foreground/70">{msg.time}</span>
                                    </div>
                                    <div
                                        className={`px-4 py-2.5 rounded-2xl shadow-sm transition-all ${isOwn
                                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                                            : "bg-muted text-foreground rounded-tl-sm"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Ô nhập chat */}
                <div className="flex flex-col gap-2 pt-3 border-t">
                    {/* Timer hiển thị khi đang recording */}
                    {isRecording && (
                        <div className="flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                            <span className="text-sm font-mono font-semibold text-destructive">
                                {formatTime(elapsedTime)}
                            </span>
                            <span className="text-xs text-muted-foreground">Đang ghi âm...</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Nhập bình luận..."
                            value={newMsg}
                            onChange={(e) => setNewMsg(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="flex-1"
                            disabled={isRecording}
                        />
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleVoiceCall}
                                className={`${isRecording
                                    ? "bg-destructive cursor-pointer hover:bg-destructive/90 text-white"
                                    : "bg-primary cursor-pointer hover:bg-primary/90 text-white"
                                    } shadow-md hover:shadow-lg transition-all`}
                                size="icon"
                            >
                                <Mic className="h-4 w-4" />
                            </Button>
                            <Button
                                onClick={handleSend}
                                disabled={!newMsg.trim() || isRecording}
                                className="bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                size="icon"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
