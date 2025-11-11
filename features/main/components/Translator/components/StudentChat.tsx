"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Send, MessageCircle, User, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { useVoiceRecognition } from "../hooks";
import { useSessionChat } from "../hooks/useSessionChat";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/Slice/authSlice";
import { useSocket } from "@/hooks/socket/SocketContext";

interface StudentChatProps {
    sessionId: string;
    currentUserId?: string;
}

export default function StudentChat({ sessionId, currentUserId }: StudentChatProps) {
    const [newMsg, setNewMsg] = useState("");
    const [elapsedTime, setElapsedTime] = useState(0);
    const chatRef = useRef<HTMLDivElement>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const { user, token } = useSelector(selectAuth);
    const { connect, disconnect } = useSocket();

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

    const resolvedToken = useMemo(() => {
        if (token) return token;
        if (typeof window !== "undefined") {
            return localStorage.getItem("token");
        }
        return null;
    }, [token]);

    const resolvedUserId = useMemo(() => {
        if (currentUserId) return currentUserId;
        if (user?._id) return user._id;

        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    return parsedUser._id || parsedUser.id || null;
                } catch (error) {
                    console.error("Error parsing currentUser:", error);
                }
            }
        }

        return null;
    }, [currentUserId, user]);

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

    useEffect(() => {
        if (!resolvedToken) {
            return;
        }

        connect(resolvedToken);

        return () => {
            disconnect();
        };
    }, [connect, disconnect, resolvedToken]);

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

    useEffect(() => {
        return () => {
            sendTyping(false);
        };
    }, [sendTyping]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleSend = async () => {
        if (newMsg.trim().length === 0) return;

        try {
            await sendMessage(newMsg.trim());
            setNewMsg("");
            sendTyping(false);
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const getInitials = (name?: string) => {
        if (!name) return "?";
        return name.trim().charAt(0).toUpperCase();
    };

    return (
        <Card className="py-3!">
            <CardHeader className="pb-3 border-b ">
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

            <CardContent className="p-4 flex flex-col flex-1 h-[calc(100vh-10rem)] ">
                <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30 min-h-0"
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
                            const isOwn = resolvedUserId ? msg.user._id === resolvedUserId : false;
                            const senderName = msg.user?.name ?? "Người dùng";
                            const time = new Date(msg.createdAt).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            const replyToMessage = (msg.replyTo && typeof msg.replyTo === "object") ? msg.replyTo : null;

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
                                            <span>{getInitials(senderName)}</span>
                                        )}
                                    </div>

                                    {/* Message bubble */}
                                    <div className={`flex flex-col max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-muted-foreground">{senderName}</span>
                                            <span className="text-xs text-muted-foreground/70">{time}</span>
                                        </div>

                                        {/* Reply to message (nếu có) */}
                                        {replyToMessage && (
                                            <div className={`mb-2 px-3 py-2 rounded-lg border-l-2 text-xs ${isOwn
                                                ? "bg-primary/10 border-primary/30 text-primary-foreground/70"
                                                : "bg-muted/50 border-muted-foreground/30 text-muted-foreground"
                                                }`}>
                                                <div className="font-medium mb-1">
                                                    {replyToMessage.user?.name ?? "Người dùng"}
                                                </div>
                                                <div className="line-clamp-2">
                                                    {replyToMessage.message}
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
                                if (e.target.value.trim() && isConnected) {
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
                            onBlur={() => sendTyping(false)}
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
