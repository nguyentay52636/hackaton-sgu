"use client"

import { motion } from "framer-motion"
import { useAdminLanguage } from "@/features/admin/i18n"

export default function ReviewsHeader() {
    const { t } = useAdminLanguage()

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <h1 className="text-4xl font-bold text-black">
                {t("Quản lý đánh giá")}
            </h1>
            <p className="text-muted-foreground">{t("Quản lý tất cả đánh giá")}</p>
        </motion.div>
    )
}

