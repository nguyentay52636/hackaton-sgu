"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/shared/ui/card'
import { cn } from '@/shared/lib/utils'

interface BrandLyftImage {
    src: string
    alt: string
}

interface BrandLyftCarouselProps {
    images?: BrandLyftImage[]
}

export default function BrandLyftCarousel({ images = defaultImages }: BrandLyftCarouselProps) {
    const totalImages = images.length
    const centerIndex = Math.floor(totalImages / 2)

    return (
        <div className="relative w-full flex items-center justify-center py-16 px-4">
            {/* Light gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5F2EB] via-[#F8F4ED] to-[#F9F6F0] -z-10" />

            {/* Carousel Container */}
            <div className="relative max-w-7xl mx-auto">
                <div
                    className={cn(
                        "relative flex items-center justify-center",
                        "h-[450px] md:h-[400px]",
                        "perspective-1000"
                    )}
                >
                    {images.map((image, index) => {
                        const offset = index - centerIndex
                        const rotation = offset * 6 // Maximum ±18° for 7 images
                        const leftOffset = offset * 90 // 90px spacing
                        const zIndex = totalImages - Math.abs(offset)

                        return (
                            <motion.div
                                key={index}
                                className="absolute"
                                initial={false}
                                whileHover={{
                                    rotateY: 0,
                                    scale: 1.12,
                                    z: 50,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: `translateX(calc(50% + ${leftOffset}px)) rotateY(${rotation}deg)`,
                                    zIndex,
                                    backfaceVisibility: 'hidden',
                                }}
                            >
                                <Card className="rounded-2xl shadow-lg overflow-hidden border-0 bg-white">
                                    <div className="relative w-[220px] md:w-[200px] h-[320px] md:h-[300px] overflow-hidden">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            loading={index < 3 ? "eager" : "lazy"}
                                            style={{
                                                borderRadius: '16px',
                                            }}
                                        />
                                        {/* Gradient overlay for depth */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Responsive stacked view for mobile */}
                <div className="md:hidden flex flex-col gap-6 items-center mt-8">
                    {images.map((image, index) => (
                        <Card key={index} className="rounded-2xl shadow-lg overflow-hidden border-0 bg-white w-[280px] h-[200px]">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                                loading={index < 2 ? "eager" : "lazy"}
                                style={{
                                    borderRadius: '16px',
                                }}
                            />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Default placeholder images
const defaultImages: BrandLyftImage[] = [
    {
        src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop",
        alt: "Travel photography"
    },
    {
        src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=600&fit=crop",
        alt: "Cooking ingredients"
    },
    {
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
        alt: "Wellness and spa"
    },
    {
        src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=600&fit=crop",
        alt: "Fitness and health"
    },
    {
        src: "https://images.unsplash.com/photo-1487412720507-e7ab3768c6cb?w=400&h=600&fit=crop",
        alt: "Healthy food"
    },
    {
        src: "https://images.unsplash.com/photo-1498561067815-ae8a07b12ed6?w=400&h=600&fit=crop",
        alt: "Artistic expression"
    },
    {
        src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=600&fit=crop",
        alt: "Delicious cuisine"
    },
]

