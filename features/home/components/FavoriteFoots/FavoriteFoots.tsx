"use client"

import React from 'react'
import { Badge } from '@/shared/ui/badge'
import { Star, ArrowUpRight, Heart } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'
import { MapPin } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { useUserStore } from '@/stores/user-store'
import { useTranslation } from '@/shared/contexts/TranslationContext'
export const featuredDishes = [
    {
        id: "1",
        name: "Phở Bò Hà Nội",
        location: "Phở Hòa Pasteur, Quận 1",
        price: "45.000đ",
        rating: 4.8,
        reviews: 234,
        image: "/img/pho-bowl.jpg",
        category: "Món chính",
    },
    {
        id: "2",
        name: "Bánh Mì Thịt Nướng",
        location: "Bánh Mì Huỳnh Hoa, Quận 1",
        price: "25.000đ",
        rating: 4.9,
        reviews: 456,
        image: "/img/banh-mi-sandwich.jpg",
        category: "Ăn vặt",
    },
    {
        id: "3",
        name: "Cơm Tấm Sườn Bì",
        location: "Cơm Tấm Mộc, Quận 3",
        price: "35.000đ",
        rating: 4.7,
        reviews: 189,
        image: "/img/com-tam-rice.jpg",
        category: "Món chính",
    },
    {
        id: "4",
        name: "Bún Bò Huế",
        location: "Bún Bò Huế 3A3, Quận 10",
        price: "40.000đ",
        rating: 4.8,
        reviews: 312,
        image: "/img/bun-bo-hue.png",
        category: "Món chính",
    },
    {
        id: "5",
        name: "Hủ Tiếu Nam Vang",
        location: "Hủ Tiếu Mỹ Tho, Quận 5",
        price: "38.000đ",
        rating: 4.6,
        reviews: 167,
        image: "/img/hu-tieu.jpg",
        category: "Món chính",
    },
    {
        id: "6",
        name: "Mì Quảng",
        location: "Mì Quảng 1A, Quận 3",
        price: "42.000đ",
        rating: 4.7,
        reviews: 203,
        image: "/img/mi-quang.jpg",
        category: "Món chính",
    },
]
export default function FavoriteFoots() {
    const { favorites, toggleFavorite } = useUserStore();
    const { t } = useTranslation()
    return (
        <>
            <section id="featured" className="py-24 bg-gradient-to-b from-background to-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="outline">
                            <Star className="w-4 h-4 mr-2 fill-primary text-primary" />
                            {t('dishes.featuredDishes')}
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('dishes.mostLovedDishes')}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t('dishes.discoverDishes')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredDishes.map((dish, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={dish.image || "/placeholder.svg"}
                                        alt={dish.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <Badge className="absolute top-4 left-4">{dish.category}</Badge>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => toggleFavorite(dish.id)}
                                    >
                                        <Heart className={`h-4 w-4 ${favorites.includes(dish.id) ? "fill-red-500 text-red-500" : ""}`} />
                                    </Button    >
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{dish.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                        <MapPin className="h-4 w-4" />
                                        <span>{dish.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-primary text-primary" />
                                            <span className="font-semibold">{dish.rating}</span>
                                            <span className="text-sm text-muted-foreground">({dish.reviews})</span>
                                        </div>
                                        <span className="text-lg font-bold text-primary ">{dish.price}</span>
                                    </div>
                                    <Button asChild className="w-full bg-primary hover:bg-primary/90 cursor-pointer text-white!  hover:text-white" variant="outline">
                                        <Link href={`/restaurant/${dish.id}`}>
                                            {t('dishes.viewDetails')}
                                            <ArrowUpRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button asChild size="lg" variant="outline">
                            <Link href="/explore">
                                {t('dishes.viewAllDishes')}
                                <ArrowUpRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
