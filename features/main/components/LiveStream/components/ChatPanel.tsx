import type React from "react"
import { Badge } from "@/shared/ui/badge"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { Card, CardContent } from "@/shared/ui/card"
import { MessageCircle, Users, Sparkles, Calendar, Smile, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const upcomingEvents = [
    {
        id: 1,
        title: "Lớp học làm Bánh Xèo",
        date: "15/01/2025",
        time: "14:00",
        host: "Chef Lan",
    },
    {
        id: 2,
        title: "Workshop Bún Bò Huế",
        date: "18/01/2025",
        time: "10:00",
        host: "Chef Minh",
    },
]

interface Message {
    id: number
    user: string
    message: string
    time: string
    avatar: string
}

interface ChatPanelProps {
    viewerCount: number
    messages: Message[]
    reactions: { emoji: string; label: string }[]
    onReaction: (emoji: string) => void
    onSendMessage: (message: string) => void
}

export default function ChatPanel({
    viewerCount,
    messages,
    reactions,
    onReaction,
    onSendMessage,
}: ChatPanelProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight
            }
        }
    }, [messages])

    return (
        <>
            <ScrollArea>
                <div className="w-full md:w-96 border-l bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-md flex flex-col shadow-2xl">
                    <div className="border-b p-4 bg-primary/10">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold flex items-center gap-2">
                                <MessageCircle className="h-5 w-5 text-primary" />
                                Trò chuyện trực tiếp
                            </h3>
                            <Badge variant="secondary" className="gap-1.5 bg-primary/10 border-primary/20">
                                <Users className="h-3.5 w-3.5" />
                                <span className="font-semibold">{viewerCount.toLocaleString()}</span>
                            </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            Tin nhắn được cập nhật tự động
                        </p>
                    </div>

                    {/* Messages */}
                    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                        <div className="space-y-3">
                            {messages.map((comment, index) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                                >
                                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 font-semibold">
                                            {comment.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-semibold text-sm">{comment.user}</span>
                                            <span className="text-xs text-muted-foreground">{comment.time}</span>
                                        </div>
                                        <p className="text-sm leading-relaxed">{comment.message}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Quick Reactions */}
                    <div className="border-t p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                        <div className="flex gap-2">
                            {reactions.slice(0, 4).map((reaction) => (
                                <motion.button
                                    key={reaction.emoji}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onReaction(reaction.emoji)}
                                    className="flex-1 py-2 px-3 bg-card hover:bg-primary/10 rounded-lg border border-primary/20 transition-all text-lg"
                                >
                                    {reaction.emoji}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="border-t p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-gradient-to-br from-primary to-secondary rounded-lg">
                                <Calendar className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <h4 className="font-bold text-sm">Sự kiện sắp tới</h4>
                        </div>
                        <div className="space-y-2">
                            {upcomingEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 4 }}
                                >
                                    <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
                                        <CardContent className="p-3 bg-gradient-to-br from-card to-background">
                                            <h5 className="font-semibold text-sm mb-1.5">{event.title}</h5>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {event.date} • {event.time}
                                                </span>
                                                <span className="font-medium">{event.host}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <ChatInput onSendMessage={onSendMessage} onToggleReactions={() => { }} />
                </div>
            </ScrollArea>
        </>
    )
}

function ChatInput({ onSendMessage, onToggleReactions }: { onSendMessage: (message: string) => void; onToggleReactions: () => void }) {
    const [message, setMessage] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            onSendMessage(message.trim())
            setMessage("")
        }
    }

    return (
        <div className="border-t p-4 bg-gradient-to-r from-card to-background">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10"
                    onClick={onToggleReactions}
                >
                    <Smile className="h-5 w-5" />
                </Button>
                <Input
                    placeholder="Viết bình luận..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-background/50 border-primary/20 focus:border-primary"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        type="submit"
                        size="icon"
                        className="bg-primary cursor-pointer hover:bg-primary/90"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </motion.div>
            </form>
        </div>
    )
}
