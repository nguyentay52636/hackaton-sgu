"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Save } from "lucide-react"

export default function SecuritySettings() {
    const { t } = useAdminLanguage()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cài đặt bảo mật</CardTitle>
                <CardDescription>Quản lý bảo mật và quyền truy cập</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Xác thực hai yếu tố</Label>
                        <p className="text-sm text-muted-foreground">Yêu cầu 2FA cho admin</p>
                    </div>
                    <Switch />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Tự động đăng xuất</Label>
                        <p className="text-sm text-muted-foreground">Đăng xuất sau 30 phút không hoạt động</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="session-timeout">Thời gian timeout (phút)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                <Button>
                    <Save className="h-4 w-4 mr-2" />
                    {t("save")}
                </Button>
            </CardContent>
        </Card>
    )
}

