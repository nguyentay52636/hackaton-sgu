import React from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { ChefHat } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Video } from 'lucide-react'
import { Clock } from 'lucide-react'
import { Shield } from 'lucide-react'
import { Award } from 'lucide-react'
export default function SelectionCTA() {
    return (
        <>
            <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="container mx-auto px-4 relative">
                    <Card className="max-w-5xl mx-auto border-2 shadow-2xl bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-12 md:p-16 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                                <ChefHat className="w-10 h-10 text-primary-foreground" />
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                                Sẵn sàng khám phá ẩm thực Sài Gòn?
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
                                Tham gia cộng đồng hàng chục nghìn người yêu ẩm thực và bắt đầu hành trình khám phá của bạn ngay hôm nay
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="text-lg h-14 px-10 shadow-xl hover:shadow-2xl transition-all">
                                    <Link href="/login">
                                        Đăng ký miễn phí
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="text-lg h-14 px-10 bg-card/50 backdrop-blur-sm hover:bg-card shadow-lg"
                                >
                                    <Link href="/livestream">
                                        <Video className="mr-2 h-5 w-5" />
                                        Xem livestream
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>Miễn phí mãi mãi</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Shield className="w-4 h-4" />
                                    <span>Bảo mật tuyệt đối</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Award className="w-4 h-4" />
                                    <span>45K+ người dùng</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    )
}
