"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/ui/dialog"
import { Upload } from "lucide-react"
import { useAdminLanguage } from "@/features/admin/i18n"

interface AddUserDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function AddUserDialog({ isOpen, onOpenChange }: AddUserDialogProps) {
    const { t } = useAdminLanguage()

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("Thêm người dùng")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarFallback>
                                <Upload className="h-8 w-8" />
                            </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            {t("Tải ảnh đại diện")}
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">{t("Tên")}</Label>
                        <Input id="name" placeholder="Nhập tên người dùng" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t("Email")}</Label>
                        <Input id="email" type="email" placeholder="Nhập email" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">{t("Số điện thoại")}</Label>
                        <Input id="phone" placeholder="Nhập số điện thoại" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">{t("Vai trò")}</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder={t("Chọn vai trò")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">{t("Người dùng")}</SelectItem>
                                <SelectItem value="owner">{t("Chủ nhà hàng")}</SelectItem>
                                <SelectItem value="admin">{t("Quản trị viên")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">{t("Trạng thái")}</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder={t("Chọn trạng thái")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">{t("Hoạt động")}</SelectItem>
                                <SelectItem value="pending">{t("Chờ duyệt")}</SelectItem>
                                <SelectItem value="suspended">{t("Tạm khóa")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {t("Hủy")}
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500">{t("Lưu")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

