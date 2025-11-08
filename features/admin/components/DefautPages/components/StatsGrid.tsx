import { Card, CardContent } from "@/shared/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/shared/lib/utils"

export default function StatsGrid({ stats }: { stats: { label: string, value: string, change: string, trend: string, icon: React.ElementType }[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat: { label: string, value: string, change: string, trend: string, icon: React.ElementType }, index: number) => (
                <Card key={index}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className="h-5 w-5 text-muted-foreground" />
                            <div
                                className={cn(
                                    "flex items-center gap-1 text-sm",
                                    stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                                )}
                            >
                                {stat.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                <span>{stat.change}</span>
                            </div>
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
