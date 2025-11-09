"use client";

import { useState, useEffect, useRef } from "react";
import { Send, MessageCircle, User, Voicemail, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { useVoiceRecognition } from "../hooks";
import { useSessionChat } from "../hooks/useSessionChat";

interface StudentChatProps {
    sessionId: string;
    currentUserId?: string;
}

export default function StudentChat({ sessionId, currentUserId }: StudentChatProps) {
    const [newMsg, setNewMsg] = useState("");
    const [elapsedTime, setElapsedTime] = useState(0);
    const chatRef = useRef<HTMLDivElement>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [sourceLang, setSourceLang] = useState("vi");

    const {
        messages,
        onlineUsers,
        isConnected,
        isLoading,
        sendMessage,
        sendTyping,
        typingUsers,
        error,
    } = useSessionChat(sessionId);

    const { isRecording, startRecording, stopRecording } = useVoiceRecognition(sourceLang, (transcript) => {
        setNewMsg(transcript);
    });

    const handleVoiceCall = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    useEffect(() => {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages]);

    // Get current user ID from localStorage if not provided
    useEffect(() => {
        if (!currentUserId && typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    // currentUserId will be used from props or from user._id
                } catch (e) {
                    console.error('Error parsing currentUser:', e);
                }
            }
        }
    }, [currentUserId]);

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

    const handleSend = async () => {
        if (newMsg.trim().length === 0 || !isConnected) return;

        try {
            await sendMessage(newMsg.trim());
            setNewMsg("");
            sendTyping(false);
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const getCurrentUserId = () => {
        if (currentUserId) return currentUserId;
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    return user._id || user.id;
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
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
                    <div className="flex items-center gap-2">
                        {isConnected ? (
                            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                                {onlineUsers.length} online
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-500/20">
                                Disconnected
                            </Badge>
                        )}
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {messages.length}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4 flex flex-col flex-1 min-h-0">
                <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30"
                >
                    {isLoading ? (
                        <div className="text-center text-muted-foreground py-8">
                            Đang tải tin nhắn...
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8">
                            Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const currentUserId = getCurrentUserId();
                            const isOwn = msg.user._id === currentUserId;
                            const time = new Date(msg.createdAt).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            return (
                                <div
                                    key={msg._id}
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
                                            <span>{getInitials(msg.user.name)}</span>
                                        )}
                                    </div>

                                    {/* Message bubble */}
                                    <div className={`flex flex-col max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-muted-foreground">{msg.user.name}</span>
                                            <span className="text-xs text-muted-foreground/70">{time}</span>
                                        </div>

                                        {/* Reply to message (nếu có) */}
                                        {msg.replyTo && typeof msg.replyTo === 'object' && (
                                            <div className={`mb-2 px-3 py-2 rounded-lg border-l-2 text-xs ${isOwn
                                                ? "bg-primary/10 border-primary/30 text-primary-foreground/70"
                                                : "bg-muted/50 border-muted-foreground/30 text-muted-foreground"
                                                }`}>
                                                <div className="font-medium mb-1">
                                                    {msg.replyTo.user.name}
                                                </div>
                                                <div className="line-clamp-2">
                                                    {msg.replyTo.message}
                                                </div>
                                            </div>
                                        )}

                                        <div
                                            className={`px-4 py-2.5 rounded-2xl shadow-sm transition-all ${isOwn
                                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                : "bg-muted text-foreground rounded-tl-sm"
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {/* Typing indicator */}
                    {Object.keys(typingUsers).length > 0 && (
                        <div className="text-sm text-muted-foreground italic">
                            {Object.values(typingUsers).join(', ')} đang gõ...
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="px-4 py-2 bg-red-100 text-red-700 text-sm rounded-lg">
                            {error}
                        </div>
                    )}
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
                            onChange={(e) => {
                                setNewMsg(e.target.value);
                                if (e.target.value.trim()) {
                                    sendTyping(true);
                                } else {
                                    sendTyping(false);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="flex-1"
                            disabled={isRecording || !isConnected}
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
                                disabled={!newMsg.trim() || isRecording || !isConnected}
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
