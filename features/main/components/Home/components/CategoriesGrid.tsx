import { Card, CardContent } from "@/shared/ui/card"

export type Category = { id: string; name: string; icon: any; color: string }

export function CategoriesGrid({
    categories,
    selectedCategory,
    onSelect,
}: {
    categories: Category[]
    selectedCategory: string
    onSelect: (id: string) => void
}) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Danh mục món ăn
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${selectedCategory === category.id ? "ring-2 ring-primary shadow-xl" : ""
                            }`}
                        onClick={() => onSelect(category.id)}
                    >
                        <CardContent className="p-6 flex flex-col items-center gap-3">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                                <category.icon className="h-8 w-8 text-white" />
                            </div>
                            <span className="font-semibold text-center text-sm">{category.name}</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


