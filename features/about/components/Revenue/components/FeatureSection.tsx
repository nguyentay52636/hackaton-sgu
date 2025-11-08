import React from 'react'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'
import { MapPin, Video, Smartphone, TrendingUp, Globe, Shield } from 'lucide-react'
export default function FeatureSection() {
    const features = [
        {
            icon: MapPin,
            title: "Bản đồ tương tác",
            description: "Khám phá hàng ngàn nhà hàng trên bản đồ Sài Gòn với thông tin chi tiết",
        },
        {
            icon: Video,
            title: "Livestream ẩm thực",
            description: "Xem trực tiếp các đầu bếp nấu ăn và tương tác với cộng đồng",
        },
        {
            icon: Smartphone,
            title: "Nhận diện món ăn",
            description: "Chụp ảnh món ăn để nhận thông tin dinh dưỡng và công thức",
        },
        {
            icon: TrendingUp,
            title: "Gợi ý thông minh",
            description: "Nhận đề xuất nhà hàng dựa trên sở thích và thời tiết",
        },
        {
            icon: Globe,
            title: "Du lịch ẩm thực",
            description: "Lộ trình khám phá ẩm thực Sài Gòn được cá nhân hóa",
        },
        {
            icon: Shield,
            title: "Đánh giá tin cậy",
            description: "Hệ thống đánh giá minh bạch từ cộng đồng người dùng",
        },
    ]
    return (
        <>
            <section className="py-24 md:py-32 lg:py-40">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <Badge className="mb-6 text-sm px-4 py-2" variant="outline">
                            Tính năng
                        </Badge>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                            Công nghệ hiện đại cho trải nghiệm tốt nhất
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
                            Ứng dụng chuyển đổi số toàn diện cho du lịch ẩm thực địa phương
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <Card
                                    key={index}
                                    className="group hover:bg-primary/10 rounded-3xl cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/20 bg-card/50 backdrop-blur-sm"
                                >
                                    <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

        </>
    )
}
