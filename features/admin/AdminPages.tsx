"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"

import SiderBarAdmin from "./components/SiderBarAdmin"
import { useAdminLanguage } from "./i18n"


import HeaderAdmin from "./components/HeaderAdmin"

export default function AdminPages({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const { t } = useAdminLanguage()

    useEffect(() => {
        const isDark = localStorage.getItem("darkMode") === "true"
        setDarkMode(isDark)
        if (isDark) {
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)
        localStorage.setItem("darkMode", String(newDarkMode))
        if (newDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <SiderBarAdmin collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <HeaderAdmin />

                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    )
}
