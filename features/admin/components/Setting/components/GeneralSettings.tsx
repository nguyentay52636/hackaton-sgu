"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Save } from "lucide-react"

export default function GeneralSettings() {
    const { t } = useAdminLanguage()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cài đặt chung</CardTitle>
                <CardDescription>Cấu hình cơ bản của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="site-name">{t("siteName")}</Label>
                    <Input id="site-name" defaultValue="Sài Gòn Culinary Hub" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="site-description">{t("description")}</Label>
                    <Input id="site-description" defaultValue="Khám phá ẩm thực Sài Gòn" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Chế độ bảo trì</Label>
                        <p className="text-sm text-muted-foreground">Tạm thời tắt website cho người dùng</p>
                    </div>
                    <Switch />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Cho phép đăng ký mới</Label>
                        <p className="text-sm text-muted-foreground">Người dùng có thể tạo tài khoản mới</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <Button>
                    <Save className="h-4 w-4 mr-2" />
                    {t("save")}
                </Button>
            </CardContent>
        </Card>
    )
}

