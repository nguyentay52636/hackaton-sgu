"use client"

import { useState, useEffect } from "react"
import LiveStreamPlayer from "./components/LiveStreamPlayer"
import LiveStreamControls from "./components/LiveStreamControls"
import LiveStreamActions from "./components/LiveStreamActions"
import ChatPanel from "./components/ChatPanel"
import HotStreams from "./components/HotStreams"
import Header from "@/features/admin/components/LiveStream/components/Header"

export default function LiveStream() {
    const [message, setMessage] = useState("")
    const [likes, setLikes] = useState(1234)
    const [isLiked, setIsLiked] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [showReactions, setShowReactions] = useState(false)
    const [floatingReactions, setFloatingReactions] = useState<{ id: number; emoji: string }[]>([])
    const [chatMessages, setChatMessages] = useState([
        { id: 1, user: "Nguyễn Văn A", message: "Trông ngon quá!", time: "2 phút trước", avatar: "N" },
        { id: 2, user: "Trần Thị B", message: "Cho mình xin công thức được không ạ?", time: "3 phút trước", avatar: "T" },
        { id: 3, user: "Lê Văn C", message: "Nhà hàng ở đâu vậy ạ?", time: "5 phút trước", avatar: "L" },
        { id: 4, user: "Phạm Thị D", message: "Mình đã thử rồi, rất ngon!", time: "7 phút trước", avatar: "P" },
        { id: 5, user: "Hoàng Văn E", message: "Cảm ơn chef đã chia sẻ!", time: "10 phút trước", avatar: "H" },
    ])
    const [viewerCount, setViewerCount] = useState(2341)

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMessages = [
                "Tuyệt vời quá!",
                "Mình muốn học làm món này",
                "Quán ở đâu vậy ạ?",
                "Giá bao nhiêu vậy chef?",
                "Nhìn ngon quá!",
                "Cảm ơn chef!",
            ]
            const randomUsers = ["Mai", "Hùng", "Linh", "Tuấn", "Hương", "Đức", "Nga", "Bình"]

            const newMessage = {
                id: Date.now(),
                user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
                message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
                time: "Vừa xong",
                avatar: randomUsers[Math.floor(Math.random() * randomUsers.length)][0],
            }

            setChatMessages((prev) => [...prev, newMessage])
            setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 4)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const liveStreams = [
        {
            id: 1,
            title: "Làm Phở Bò truyền thống",
            restaurant: "Phở Hòa Pasteur",
            host: "Chef Minh",
            viewers: 2341,
            thumbnail: "/img/pho-bowl.jpg",
            isLive: true,
        },
        {
            id: 2,
            title: "Bí quyết làm Cơm Tấm ngon",
            restaurant: "Cơm Tấm Mộc",
            host: "Chef Lan",
            viewers: 876,
            thumbnail: "/img/com-tam-rice.jpg",
            isLive: true,
        },
        {
            id: 3,
            title: "Hướng dẫn làm Bánh Mì",
            restaurant: "Bánh Mì Huỳnh Hoa",
            host: "Chef Hoa",
            viewers: 543,
            thumbnail: "/img/banh-mi-sandwich.jpg",
            isLive: false,
        },
    ]

    const reactions = [
        { emoji: "❤️", label: "Thích" },
        { emoji: "👍", label: "Tuyệt" },
        { emoji: "😍", label: "Yêu" },
        { emoji: "🔥", label: "Hot" },
        { emoji: "👏", label: "Hay" },
        { emoji: "😋", label: "Ngon" },
    ]

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1)
        } else {
            setLikes(likes + 1)
        }
        setIsLiked(!isLiked)
    }

    const handleReaction = (emoji: string) => {
        const id = Date.now()
        setFloatingReactions((prev) => [...prev, { id, emoji }])
        setTimeout(() => {
            setFloatingReactions((prev) => prev.filter((r) => r.id !== id))
        }, 3000)
        setShowReactions(false)
    }

    const handleSendMessage = (message: string) => {
        const newMessage = {
            id: Date.now(),
            user: "Bạn",
            message: message,
            time: "Vừa xong",
            avatar: "B",
        }
        setChatMessages((prev) => [...prev, newMessage])
    }

    const handleToggleReactions = () => {
        setShowReactions(!showReactions)
    }

    return (
        <>
            {/* <LiveStreamHeader /> */}
            <Header />

            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <div className="relative">
                        <LiveStreamPlayer
                            title="Làm Phở Bò truyền thống"
                            restaurant="Phở Hòa Pasteur"
                            host="Chef Minh"
                            viewerCount={viewerCount}
                            floatingReactions={floatingReactions}
                        />
                        <LiveStreamControls isMuted={isMuted} onMuteToggle={() => setIsMuted(!isMuted)} />
                    </div>

                    <LiveStreamActions
                        likes={likes}
                        isLiked={isLiked}
                        showReactions={showReactions}
                        onLike={handleLike}
                        onReaction={handleReaction}
                        onToggleReactions={handleToggleReactions}
                    />

                    <HotStreams streams={liveStreams.slice(1)} />
                </div>

                <ChatPanel
                    viewerCount={viewerCount}
                    messages={chatMessages}
                    reactions={reactions}
                    onReaction={handleReaction}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </>
    )
}
