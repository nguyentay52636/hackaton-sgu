"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { useAdminLanguage } from "@/features/admin/i18n"
import { User } from "../types"
import { getInitials, getStatusBadge, getRoleBadge } from "../utils"
import ActionsTable from "./ActionsTable"

interface UsersTableProps {
    users: User[]
    onViewDetails: (user: User) => void
}

export default function UsersTable({ users, onViewDetails }: UsersTableProps) {
    const { t } = useAdminLanguage()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{t("Người dùng")}</TableHead>
                    <TableHead>{t("Email")}</TableHead>
                    <TableHead>{t("Vai trò")}</TableHead>
                    <TableHead>{t("Ngày tham gia")}</TableHead>
                    <TableHead>{t("Trạng thái")}</TableHead>
                    <TableHead className="text-right">{t("Thao tác")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} className="" />
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium ">{user.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-right">
                            <ActionsTable user={user} onViewDetails={onViewDetails} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

