"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog"
import { Upload, Trash2 } from "lucide-react"
import { useAdminLanguage } from "@/features/admin/i18n"

interface AddLocationDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

export default function AddLocationDialog({ isOpen, onOpenChange, children }: AddLocationDialogProps) {
    const { t } = useAdminLanguage()
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t("Thêm địa điểm")}</DialogTitle>
                    <DialogDescription>{t("Quản lý tất cả địa điểm")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="image">{t("Tải lên ảnh")}</Label>
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => setImagePreview(null)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <label htmlFor="image-upload" className="block">
                                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/50">
                                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">{t("Tải lên ảnh")}</p>
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t("Tên địa điểm")}</Label>
                            <Input id="name" placeholder="Nhập tên địa điểm" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">{t("Số điện thoại")}</Label>
                            <Input id="phone" placeholder="028 xxxx xxxx" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">{t("Địa chỉ")}</Label>
                        <Input id="address" placeholder="Nhập địa chỉ đầy đủ" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">{t("Danh mục")}</Label>
                            <Input id="category" placeholder="Phở, Bánh Mì, Cơm Tấm..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="openTime">{t("Giờ mở cửa")}</Label>
                            <Input id="openTime" placeholder="06:00 - 22:00" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">{t("Mô tả")}</Label>
                        <Textarea id="description" placeholder="Mô tả về địa điểm" rows={4} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="lat">{t("Vĩ độ")}</Label>
                            <Input id="lat" type="number" step="0.0001" placeholder="10.7769" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lng">{t("Kinh độ")}</Label>
                            <Input id="lng" type="number" step="0.0001" placeholder="106.6951" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {t("Hủy")}
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>{t("Lưu")}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

