"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Save } from "lucide-react"

export default function NotificationsSettings() {
    const { t } = useAdminLanguage()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
                <CardDescription>Quản lý thông báo email và push</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Email thông báo đăng ký mới</Label>
                        <p className="text-sm text-muted-foreground">Nhận email khi có người dùng mới</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Email thông báo nhà hàng mới</Label>
                        <p className="text-sm text-muted-foreground">Nhận email khi có nhà hàng đăng ký</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Email thông báo đánh giá mới</Label>
                        <p className="text-sm text-muted-foreground">Nhận email khi có đánh giá cần duyệt</p>
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

