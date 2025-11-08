"use client"

import { Button } from "@/shared/ui/button"
import { Plus } from "lucide-react"
import { useAdminLanguage } from "@/features/admin/i18n"
import AddLocationDialog from "./Dialog/AddLocationDialog"

interface LocationsAdminHeaderProps {
    isDialogOpen: boolean
    onDialogOpenChange: (open: boolean) => void
}

export default function LocationsAdminHeader({ isDialogOpen, onDialogOpenChange }: LocationsAdminHeaderProps) {
    const { t } = useAdminLanguage()

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold text-black">
                    {t("Quản lý địa điểm")}
                </h1>
                <p className="text-muted-foreground">{t("Quản lý tất cả địa điểm")}</p>
            </div>
            <AddLocationDialog isOpen={isDialogOpen} onOpenChange={onDialogOpenChange}>
                <Button className="bg-primary  hover:primary/90  cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("Thêm địa điểm")}
                </Button>
            </AddLocationDialog>
        </div>
    )
}

