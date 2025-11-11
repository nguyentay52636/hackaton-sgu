"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Badge } from "@/shared/ui/badge"
import { Separator } from "@/shared/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Settings, Download, Trash2, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { UserProfile } from "./types"

interface ProfileInfoCardProps {
    profile: UserProfile
    onProfileChange: (profile: UserProfile) => void
    onDownloadData: () => void
    onDeleteClick: () => void
}

export function ProfileInfoCard({
    profile,
    onProfileChange,
    onDownloadData,
    onDeleteClick,
}: ProfileInfoCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [localProfile, setLocalProfile] = useState(profile)
    const { toast } = useToast()

    const handleSave = () => {
        onProfileChange(localProfile)
        setIsEditing(false)
        toast({
            title: "Đã lưu",
            description: "Thông tin cá nhân đã được cập nhật",
        })
    }

    const handleCancel = () => {
        setLocalProfile(profile)
        setIsEditing(false)
    }

    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="text-base">Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={localProfile.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {localProfile.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    {isEditing ? (
                        <div className="w-full space-y-3">
                            <div className="space-y-2">
                                <Label>Tên hiển thị</Label>
                                <Input
                                    value={localProfile.name}
                                    onChange={(e) =>
                                        setLocalProfile({ ...localProfile, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={localProfile.email}
                                    onChange={(e) =>
                                        setLocalProfile({ ...localProfile, email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Ngôn ngữ</Label>
                                <Select
                                    value={localProfile.language}
                                    onValueChange={(v: "vi" | "en") =>
                                        setLocalProfile({ ...localProfile, language: v })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleSave} className="flex-1">
                                    Lưu
                                </Button>
                                <Button variant="outline" onClick={handleCancel}>
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-center">
                                <h2 className="text-xl font-bold">{localProfile.name}</h2>
                                {localProfile.email && (
                                    <p className="text-sm text-muted-foreground">{localProfile.email}</p>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                className="w-full bg-transparent"
                                onClick={() => setIsEditing(true)}
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                            </Button>
                        </>
                    )}
                </div>

                <Separator />

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tham gia từ</span>
                        <span className="font-medium">
                            {localProfile.joinDate.toLocaleDateString("vi-VN")}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Ngôn ngữ</span>
                        <Badge variant="secondary">
                            <Globe className="w-3 h-3 mr-1" />
                            {localProfile.language === "vi" ? "Tiếng Việt" : "English"}
                        </Badge>
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={onDownloadData}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Tải dữ liệu về máy
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
                        onClick={onDeleteClick}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Xóa tất cả dữ liệu
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

