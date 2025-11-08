import { Button } from "@/shared/ui/button"
import { Heart, MessageCircle, Share2, Gift, MoreVertical, Smile } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/lib/utils"

interface LiveStreamActionsProps {
    likes: number
    isLiked: boolean
    showReactions: boolean
    onLike: () => void
    onReaction: (emoji: string) => void
    onToggleReactions: () => void
}

const reactions = [
    { emoji: "❤️", label: "Thích" },
    { emoji: "👍", label: "Tuyệt" },
    { emoji: "😍", label: "Yêu" },
    { emoji: "🔥", label: "Hot" },
    { emoji: "👏", label: "Hay" },
    { emoji: "😋", label: "Ngon" },
]

export default function LiveStreamActions({
    likes,
    isLiked,
    showReactions,
    onLike,
    onReaction,
    onToggleReactions,
}: LiveStreamActionsProps) {
    return (
        <div className="border-t bg-gradient-to-r from-card via-background to-card backdrop-blur-sm p-4 shadow-lg">
            <div className="flex items-center justify-around max-w-3xl mx-auto gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn("flex-col h-auto gap-1 hover:bg-primary/10 transition-all", isLiked && "text-red-500")}
                        onClick={onLike}
                    >
                        <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
                        <span className="text-xs font-semibold">{likes.toLocaleString()}</span>
                    </Button>
                </motion.div>

                <div className="relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-col h-auto gap-1 hover:bg-primary/10"
                            onClick={onToggleReactions}
                        >
                            <Smile className="h-6 w-6" />
                            <span className="text-xs font-semibold">Cảm xúc</span>
                        </Button>
                    </motion.div>

                    <AnimatePresence>
                        {showReactions && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 10 }}
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card border rounded-xl shadow-2xl p-2 flex gap-1"
                            >
                                {reactions.map((reaction) => (
                                    <motion.button
                                        key={reaction.emoji}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onReaction(reaction.emoji)}
                                        className="text-2xl p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                        title={reaction.label}
                                    >
                                        {reaction.emoji}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="flex-col h-auto gap-1 hover:bg-primary/10">
                        <MessageCircle className="h-6 w-6" />
                        <span className="text-xs font-semibold">Bình luận</span>
                    </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="flex-col h-auto gap-1 hover:bg-primary/10">
                        <Share2 className="h-6 w-6" />
                        <span className="text-xs font-semibold">Chia sẻ</span>
                    </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-col h-auto gap-1 hover:bg-gradient-to-br hover:from-yellow-500/10 hover:to-orange-500/10"
                    >
                        <Gift className="h-6 w-6 text-yellow-600" />
                        <span className="text-xs font-semibold">Tặng quà</span>
                    </Button>
                </motion.div>

                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}

