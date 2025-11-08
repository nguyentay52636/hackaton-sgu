import { Badge } from '@/shared/ui/badge'
import React from 'react'

export default function SelectionTarget() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <Badge variant="outline" className="mb-6 text-base px-6 py-2">
                        Mục tiêu
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Mục tiêu của chúng tôi</h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Chúng tôi cam kết mang đến trải nghiệm ẩm thực độc đáo và tiện lợi cho mọi người.
                    </p>
                </div>
            </div>
        </section>
    )
}
