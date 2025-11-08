import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Search, Filter } from "lucide-react"

export function SearchFilter({
    searchQuery,
    onChange,
}: {
    searchQuery: string
    onChange: (value: string) => void
}) {
    return (
        <Card className="border-2 shadow-lg bg-gradient-to-r from-card via-card to-primary/5">
            <CardContent className="p-6">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Tìm kiếm nhà hàng, món ăn..."
                            className="pl-12 h-14 text-base border-2 focus:border-primary bg-background/50 backdrop-blur-sm"
                            value={searchQuery}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                    <Link href="/explore">
                        <Button variant="outline" size="lg" className="px-8 border-2 bg-background/50 backdrop-blur-sm h-14">
                            <Filter className="h-5 w-5 mr-2" />
                            Lọc nâng cao
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}


