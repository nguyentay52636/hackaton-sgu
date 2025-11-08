"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Badge } from "@/shared/ui/badge"
import { categories } from "./data"

interface EventCategoryTabsProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
    children: React.ReactNode
}

export default function EventCategoryTabs({ selectedCategory, onCategoryChange, children }: EventCategoryTabsProps) {
    return (
        <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
            <TabsList className="grid w-full grid-cols-4 h-12">
                {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="text-base">
                        {category.label}
                        <Badge variant="secondary" className="ml-2">
                            {category.count}
                        </Badge>
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-8">
                {children}
            </TabsContent>
        </Tabs>
    )
}

