"use client"

import { useState } from "react"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Plus } from "lucide-react"

export default function Header() {
    const { t } = useAdminLanguage()
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    return (
        <div className="flex items-center justify-between">
        <div>
                <h1 className="text-4xl font-bold text-black">
                    {t("Quản lý phát trực tiếp")}
                </h1>
                <p className="text-muted-foreground mt-1">{t("Quản lý tất cả phát trực tiếp")}</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-primary  hover:primary/90  cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        {t("Thêm phát trực tiếp")}
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{t("Thêm phát trực tiếp")}</DialogTitle>
                        <DialogDescription>{t("Thêm phát trực tiếp")}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{t("Tiêu đề")}</Label>
                            <Input placeholder={t("Tiêu đề")} />
                        </div>
                        <div className="space-y-2">
                            <Label>{t("Mô tả")}</Label>
                            <Textarea placeholder={t("Mô tả")} rows={3} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>{t("Tên nhà hàng")}</Label>
                                <Input placeholder={t("Nhà hàng")} />
                            </div>
                            <div className="space-y-2">
                                <Label>{t("Thời gian")}</Label>
                                <Input type="datetime-local" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>{t("Thời gian phát trực tiếp")}</Label>
                                <Input placeholder="60 phút" />
                            </div>
                            <div className="space-y-2">
                                <Label>{t("URL phát trực tiếp")}</Label>
                                <Input placeholder="https://..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>{t("Hình ảnh")}</Label>
                            <Input type="file" accept="image/*" />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                {t("Hủy")}
                            </Button>
                            <Button className="bg-gradient-to-r from-[#D4145A] to-[#FBB03B]">{t("Lưu")}</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


