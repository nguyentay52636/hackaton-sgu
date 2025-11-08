'use client'

import { Badge } from '@/shared/ui/badge'
import React from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'

export default function Rate() {
    const testimonials = [
        {
            name: "Nguyễn Minh Anh",
            role: "Food Blogger",
            content: "Ứng dụng tuyệt vời giúp tôi khám phá nhiều quán ăn mới. Tính năng livestream rất hữu ích!",
            rating: 5,
        },
        {
            name: "Trần Văn Bình",
            role: "Du khách",
            content: "Bản đồ tương tác và gợi ý thông minh giúp chuyến du lịch của tôi trở nên hoàn hảo.",
            rating: 5,
        },
        {
            name: "Lê Thị Cẩm",
            role: "Chủ nhà hàng",
            content: "Nền tảng tuyệt vời để quảng bá nhà hàng. Tôi đã có thêm nhiều khách hàng mới!",
            rating: 5,
        },
        {
            name: "Phạm Đức Thắng",
            role: "Nhiếp ảnh gia ẩm thực",
            content: "Chất lượng ảnh và video trên nền tảng cực kỳ tốt. Tôi có thể chia sẻ tác phẩm của mình dễ dàng!",
            rating: 5,
        },
    ]

    return (
        <>
            <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-6" variant="outline">
                            <Star className="w-4 h-4 mr-2 fill-primary text-primary" />
                            Đánh giá từ người dùng
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Được tin dùng bởi hàng nghìn người</h2>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <Carousel
                            opts={{
                                align: "start",
                                slidesToScroll: 3,
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {testimonials.map((testimonial, index) => (
                                    <CarouselItem key={index} className="md:basis-1/3">
                                        <Card className="bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all h-full">
                                            <CardContent className="p-8">
                                                <div className="flex gap-1 mb-4">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                                                    ))}
                                                </div>
                                                <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">"{testimonial.content}"</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{testimonial.name}</div>
                                                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </section>
        </>
    )
}
