import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card"
import { TrendingUp } from "lucide-react"

export default function AnalyticsGrid({ t }: { t: any }) {
    return (
        <div className="grid gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>{t("overallStats")}</CardTitle>
                    <CardDescription>{t("last30Days")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="text-sm text-muted-foreground">{t("totalViews")}</p>
                                <p className="text-2xl font-bold">1.2M</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="text-sm text-muted-foreground">{t("newUsers")}</p>
                                <p className="text-2xl font-bold">3,456</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="text-sm text-muted-foreground">{t("newRestaurants")}</p>
                                <p className="text-2xl font-bold">89</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="text-sm text-muted-foreground">{t("totalLivestreams")}</p>
                                <p className="text-2xl font-bold">234</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
