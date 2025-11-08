import { Button } from "@/shared/ui/button"
import { Plus } from "lucide-react"

export default function HeaderBar() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Quản lý nhà hàng</h1>
                <p className="text-muted-foreground">Danh sách tất cả nhà hàng trong hệ thống</p>
            </div>
            <Button>
                <Plus className="h-4 w-4 mr-2" />
                Thêm nhà hàng
            </Button>
        </div>
    )
}
