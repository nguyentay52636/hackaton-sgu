import { Button } from '@/shared/ui/button'
import React from 'react'
import { Plus } from 'lucide-react'
import { useAdminLanguage } from '@/features/admin/i18n'
interface HeaderUserProps {
    setIsAddDialogOpen: (isOpen: boolean) => void
}
export default function HeaderUser({ setIsAddDialogOpen }: HeaderUserProps) {
    const { t } = useAdminLanguage()
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-black">
                        {t("Tổng người dùng")}
                    </h1>
                    <p className="text-muted-foreground">{t("Danh sách người dùng")}</p>
                </div>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-primary  hover:primary/90  cursor-pointer"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("Thêm người dùng")}
                </Button>
            </div>
        </>
    )
}
