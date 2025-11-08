"use client"

import { Cable as Cube } from "lucide-react"

export default function HeaderSection() {
    return (
        <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg mb-4">
                <Cube className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                AR Preview 3D
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Xem trước món ăn và nhà hàng trong không gian 3D với khả năng xoay, phóng to và tương tác
            </p>
        </div>
    )
}


