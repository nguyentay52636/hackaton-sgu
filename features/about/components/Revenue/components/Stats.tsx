'use client'

import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function Stats() {
    const stats = [
        { value: 1234, suffix: "+", label: "Nhà hàng" },
        { value: 45000, suffix: "+", label: "Người dùng" },
        { value: 12000, suffix: "+", label: "Đánh giá" },
        { value: 89, suffix: "", label: "Livestreams" },
    ]

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    })

    return (
        <section ref={ref} className="py-16 bg-primary/3">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-4xl md:text-5xl lg:text-6xl font-bold from-primary bg-clip-text text-primary mb-3 group-hover:scale-110 transition-transform">
                                {inView && (
                                    <CountUp
                                        start={0}
                                        end={stat.value}
                                        duration={2.5}
                                        separator=" "
                                        delay={index * 0.2}
                                    />
                                )}
                                {!inView && stat.value}
                                {stat.suffix}
                            </div>
                            <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
