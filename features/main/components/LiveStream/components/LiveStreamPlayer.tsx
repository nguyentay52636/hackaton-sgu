import { Badge } from "@/shared/ui/badge"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Eye, Star, Heart, TrendingUp, Users, Check, Crown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface LiveStreamPlayerProps {
    title: string
    restaurant: string
    host: string
    viewerCount: number
    floatingReactions: { id: number; emoji: string }[]
}

export default function LiveStreamPlayer({
    title,
    restaurant,
    host,
    viewerCount,
    floatingReactions,
}: LiveStreamPlayerProps) {
    const [showQualityMenu, setShowQualityMenu] = useState(false)
    const [selectedQuality, setSelectedQuality] = useState("HD")

    return (
        <div className="relative bg-black aspect-video shadow-2xl overflow-hidden group">
            {/* Video/Image Background */}
            <div className="absolute inset-0">
                <img src="/img/pho-bowl.jpg" alt="Livestream" className="w-full h-full object-cover" />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between">
                {/* Left - Live Badge & Info */}
                <div className="flex items-center gap-3">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Badge className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white border-0 shadow-2xl shadow-red-500/50 px-4 py-2 rounded-full">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                className="w-2.5 h-2.5 bg-white rounded-full mr-2.5"
                            />
                            <span className="font-extrabold text-sm tracking-wide">LIVE</span>
                        </Badge>
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-xl text-white px-3 py-1.5 rounded-full border border-white/20"
                    >
                        <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                        <span className="text-xs font-semibold text-green-400">Đang phát</span>
                    </motion.div>
                </div>

                {/* Right - Viewer Count & Controls */}
                <div className="flex items-center gap-2">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        <div className="bg-black/70 backdrop-blur-xl text-white px-4 py-2.5 rounded-full flex items-center gap-2.5 shadow-xl border border-white/10">
                            <div className="relative">
                                <Eye className="h-4.5 w-4.5 text-red-400" />
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                                    className="absolute inset-0 bg-red-400/30 blur-md rounded-full"
                                />
                            </div>
                            <span className="font-bold text-sm">{viewerCount.toLocaleString()}</span>
                        </div>
                    </motion.div>

                    {/* Quality Selector */}
                    <div className="relative">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowQualityMenu(!showQualityMenu)}
                            className="bg-black/70 backdrop-blur-xl text-white px-4 py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-xl border border-white/10 hover:bg-black/80 transition-colors"
                        >
                            <span className="font-semibold text-sm">{selectedQuality}</span>
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        </motion.div>

                        <AnimatePresence>
                            {showQualityMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-xl text-white rounded-lg shadow-2xl border border-white/20 overflow-hidden min-w-[120px]"
                                >
                                    {["4K", "HD", "480p", "360p"].map((quality) => (
                                        <motion.div
                                            key={quality}
                                            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                                            onClick={() => {
                                                setSelectedQuality(quality)
                                                setShowQualityMenu(false)
                                            }}
                                            className="px-4 py-2.5 text-sm font-semibold cursor-pointer flex items-center justify-between gap-3"
                                        >
                                            <span>{quality}</span>
                                            {selectedQuality === quality && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Bottom Info - Enhanced */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <motion.div whileHover={{ scale: 1.05 }} className="relative flex-shrink-0 cursor-pointer">
                            <Avatar className="h-16 w-16 border-[3px] border-white/20 shadow-2xl ring-2 ring-primary/30">
                                <AvatarFallback className="bg-gradient-to-br from-primary via-primary to-secondary text-white font-bold text-lg">
                                    CM
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-1.5 border-[3px] border-black/50 shadow-lg">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                    className="w-2.5 h-2.5 bg-white rounded-full"
                                />
                            </div>
                            <div className="absolute -top-1 -left-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-1">
                                <Crown className="h-3 w-3 text-white" />
                            </div>
                        </motion.div>
                        <div className="flex-1 min-w-0">
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-white font-bold text-2xl mb-2 line-clamp-1"
                            >
                                {title}
                            </motion.h2>
                            <div className="flex items-center gap-2 mb-3">
                                <p className="text-white/95 text-sm font-semibold flex items-center gap-2">
                                    <span>{restaurant}</span>
                                    <span className="text-white/60">•</span>
                                    <span className="flex items-center gap-1.5">
                                        {host}
                                        <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0 px-2 py-0.5 text-xs rounded-full">
                                            Chef
                                        </Badge>
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-white/90 text-sm font-semibold">4.9</span>
                                    <span className="text-white/60 text-sm">(2.3k)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4 text-blue-400" />
                                    <span className="text-white/90 text-sm font-semibold">45.2k</span>
                                    <span className="text-white/60 text-sm">theo dõi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0"
                    >
                        <Button className="bg-gradient-to-r from-primary via-primary to-secondary hover:opacity-90 shadow-xl shadow-primary/50 font-semibold px-6 py-6 rounded-full">
                            <Check className="h-5 w-5 mr-2" />
                            Theo dõi
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Floating Reactions - Enhanced */}
            <AnimatePresence>
                {floatingReactions.map((reaction) => (
                    <motion.div
                        key={reaction.id}
                        initial={{ y: 0, x: Math.random() * 100 - 50, opacity: 1, scale: 0 }}
                        animate={{ y: -250, opacity: 0, scale: 1.8, rotate: Math.random() * 20 - 10 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        className="absolute bottom-40 text-5xl pointer-events-none z-10 drop-shadow-2xl"
                        style={{
                            left: `${Math.random() * 80 + 10}%`,
                            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
                        }}
                    >
                        {reaction.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute -right-40 -top-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute -left-40 -bottom-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"
                />
            </div>
        </div>
    )
}

