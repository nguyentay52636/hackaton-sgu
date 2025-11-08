import { Button } from '@/shared/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu'
import { Edit, Eye, MoreVertical, XCircle } from 'lucide-react'
import React from 'react'
import { User } from '../types'
import { useAdminLanguage } from '@/features/admin/i18n'

export default function ActionsTable({ user, onViewDetails }: { user: User, onViewDetails: (user: User) => void }) {
  const { t } = useAdminLanguage()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onViewDetails(user)}>
            <Eye className="h-4 w-4 mr-2" />
            {t("Xem hồ sơ")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="h-4 w-4 mr-2" />
            {t("Chỉnh sửa")}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <XCircle className="h-4 w-4 mr-2" />
            {t("Tạm khóa")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
