import React, { useState } from 'react'
import { useAdminLanguage } from '@/features/admin/i18n'
import { Button } from '@/shared/ui/button'
import { Download } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { ImageIcon, Plus } from 'lucide-react'
export default function EventsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black">
            Quản lý sự kiện
          </h1>
          <p className="text-muted-foreground mt-1">Quản lý tất cả sự kiện</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2 text-black cursor-pointer" />
            Xuất dữ liệu
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary  hover:primary/90  cursor-pointer">
                <Plus className="h-4 w-4 mr-2 text-white cursor-pointer" />
                Thêm sự kiện
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-black">Thêm sự kiện</DialogTitle>
                <DialogDescription className="text-black">Tạo sự kiện mới cho cộng đồng ẩm thực</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="eventImage">Hình ảnh sự kiện</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Nhấp để tải lên hình ảnh</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventName">Tên sự kiện</Label>
                  <Input id="eventName" placeholder="Nhập tên sự kiện" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Input id="category" placeholder="Festival, Workshop, Conference..." className="h-11" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Ngày sự kiện</Label>
                    <Input id="eventDate" type="date" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventTime">Thời gian</Label>
                    <Input id="eventTime" type="time" className="h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Địa điểm</Label>
                  <Input id="location" placeholder="Địa điểm tổ chức" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả chi tiết về sự kiện" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="participants">Người tham gia</Label>
                    <Input id="participants" type="number" placeholder="0" disabled className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Số lượng tối đa</Label>
                    <Input id="maxParticipants" type="number" placeholder="100" className="h-11" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  Lưu
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
