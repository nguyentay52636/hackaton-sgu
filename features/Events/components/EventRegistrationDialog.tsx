"use client"

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
import { Calendar, Clock, MapPin, ChefHat, Share2, Check } from "lucide-react"
import { Event } from "./types"

interface EventRegistrationDialogProps {
    event: Event
    isRegistered: boolean
    onRegister: (eventId: number) => void
}

export default function EventRegistrationDialog({ event, isRegistered, onRegister }: EventRegistrationDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant={isRegistered ? "secondary" : "default"}
                    className="gap-2"
                >
                    {isRegistered ? (
                        <>
                            <Check className="h-4 w-4" />
                            Đã đăng ký
                        </>
                    ) : (
                        "Đăng ký ngay"
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <DialogTitle className="text-2xl">{event.title}</DialogTitle>
                            <DialogDescription>{event.description}</DialogDescription>
                        </div>
                        <Button size="icon" variant="ghost">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                        <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Ngày
                            </Label>
                            <p className="text-sm font-medium">{event.date}</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Thời gian
                            </Label>
                            <p className="text-sm font-medium">{event.time}</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Địa điểm
                            </Label>
                            <p className="text-sm font-medium">{event.location}</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <ChefHat className="h-4 w-4" />
                                Người hướng dẫn
                            </Label>
                            <p className="text-sm font-medium">{event.host}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input id="name" placeholder="Nhập họ và tên của bạn" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="email@example.com" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input id="phone" placeholder="0123456789" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="note">Ghi chú (tùy chọn)</Label>
                        <Textarea id="note" placeholder="Yêu cầu đặc biệt hoặc câu hỏi..." />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                            <p className="text-sm text-muted-foreground">Tổng thanh toán</p>
                            <p className="text-2xl font-bold text-primary">{event.price}</p>
                        </div>
                        <Button size="lg" onClick={() => onRegister(event.id)}>
                            Xác nhận đăng ký
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

