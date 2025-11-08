"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export default function StudentChat() {
    const [messages, setMessages] = useState<
        { id: number; user: string; text: string; time: string }[]
    >([
        { id: 1, user: "An", text: "Mọi người xem tới đoạn 3:15 chưa? 😆", time: "18:32" },
        { id: 2, user: "Hà", text: "Đoạn đó thầy ví dụ rất dễ hiểu.", time: "18:33" },
    ]);

    const [newMsg, setNewMsg] = useState("");
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages]);

    const handleSend = () => {
        if (newMsg.trim().length === 0) return;

        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
        const newMessage = { id: Date.now(), user: "Bạn", text: newMsg, time };

        setMessages((prev) => [...prev, newMessage]);
        setNewMsg("");
    };

    return (
        <Card className="h-full flex flex-col border-l bg-white/70 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-3">💬 Thảo luận lớp học</h2>

                {/* Danh sách tin nhắn */}
                <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto space-y-3 mb-3 p-1 scrollbar-thin scrollbar-thumb-gray-300"
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-[85%] p-3 rounded-lg ${msg.user === "Bạn"
                                    ? "ml-auto bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                                <span>{msg.user}</span>
                                <span>{msg.time}</span>
                            </div>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                    ))}
                </div>

                {/* Ô nhập chat */}
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Nhập bình luận..."
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
