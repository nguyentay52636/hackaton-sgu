import { Badge } from "@/shared/ui/badge"

export const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}

export const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
        active: { variant: "default", label: "Hoạt động" },
        pending: { variant: "secondary", label: "Chờ duyệt" },
        suspended: { variant: "destructive", label: "Tạm khóa" },
    }
    const config = variants[status] || variants.active
    return <Badge variant={config.variant}>{config.label}</Badge>
}

export const getRoleBadge = (role: string) => {
    const variants: Record<string, { label: string; className: string }> = {
        owner: { label: "Chủ nhà hàng", className: "bg-gradient-to-r from-orange-500 to-red-500 text-white" },
        user: { label: "Người dùng", className: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" },
        admin: { label: "Quản trị viên", className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white" },
    }
    const config = variants[role] || variants.user
    return <Badge className={config.className}>{config.label}</Badge>
}

