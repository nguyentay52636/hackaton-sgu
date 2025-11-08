"use client"
import { Badge } from '@/shared/ui/badge'
import { motion } from 'framer-motion'
import React from 'react'

export default function SelectionMission() {
    return (
        <>
            <section>
                <div className="container py-20 mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <Badge variant="secondary" className="mb-6  px-6 py-2">
                            Về chúng tôi
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                            Kết nối bạn với ẩm thực Sài Gòn
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                            Nền tảng chuyển đổi số hàng đầu cho du lịch ẩm thực địa phương tại Thành phố Hồ Chí Minh
                        </p>
                    </motion.div>
                </div>
            </section>


        </>
    )
}
