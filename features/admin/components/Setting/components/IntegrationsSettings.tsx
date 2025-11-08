"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Save } from "lucide-react"

export default function IntegrationsSettings() {
    const { t } = useAdminLanguage()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tích hợp API</CardTitle>
                <CardDescription>Cấu hình các dịch vụ bên thứ ba</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="google-api">{t("googleVisionKey")}</Label>
                    <Input id="google-api" type="password" placeholder="••••••••••••••••" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="weather-api">Open-Meteo API Key</Label>
                    <Input id="weather-api" type="password" placeholder="••••••••••••••••" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="maps-api">Google Maps API Key</Label>
                    <Input id="maps-api" type="password" placeholder="••••••••••••••••" />
                </div>
                <Button>
                    <Save className="h-4 w-4 mr-2" />
                    {t("save")}
                </Button>
            </CardContent>
        </Card>
    )
}

