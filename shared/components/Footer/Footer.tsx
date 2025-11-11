import React from 'react'
import { GraduationCap, HeartHandshake, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="border-t border-blue-200/40 py-10 bg-gradient-to-br from-blue-50/80 via-indigo-50/70 to-purple-50/80 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-10">

                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-md">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    InclusiveLearn
                                </h3>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Học tập hòa nhập cùng AI
                                </p>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            Nền tảng học tập hỗ trợ người học có nhu cầu đặc biệt, giúp chuyển đổi giọng nói – văn bản và giao tiếp cùng Chatbot AI.
                        </p>
                        <div className="flex gap-2 mt-4">
                            <Button size="icon" variant="outline" className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30">
                                <Facebook className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button size="icon" variant="outline" className="rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30">
                                <Instagram className="h-4 w-4 text-indigo-600" />
                            </Button>
                            <Button size="icon" variant="outline" className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30">
                                <Twitter className="h-4 w-4 text-purple-600" />
                            </Button>
                        </div>
                    </div>

                    {/* --- Quick Links --- */}
                    <div>
                        <h4 className="font-semibold mb-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Liên kết nhanh
                        </h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li>
                                <Link href="/" className="hover:text-blue-600 transition">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link href="/learn" className="hover:text-blue-600 transition">
                                    Giao diện học tập
                                </Link>
                            </li>
                            <li>
                                <Link href="/notes" className="hover:text-blue-600 transition">
                                    Ghi chú học tập
                                </Link>
                            </li>
                            <li>
                                <Link href="/accessibility" className="hover:text-blue-600 transition">
                                    Cài đặt trợ năng
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* --- Contact --- */}
                    <div>
                        <h4 className="font-semibold mb-4 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Liên hệ
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                <span>TP. Hồ Chí Minh, Việt Nam</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-indigo-500" />
                                <span>+84 912 345 678</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-purple-500" />
                                <span>contact@inclusivelearn.ai</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-200/30 mt-10 pt-4 text-center text-xs text-muted-foreground">
                    © 2025 InclusiveLearn. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
