"use client";
import { usePathname } from "next/navigation";
import Footer from "@/shared/components/Footer";
import { HeaderAuth } from "@/shared/components/HeaderAuth/HeaderAuth";
import { DynamicLang } from "./components/DynamicLang";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/auth/") ?? false;
    const isAdminPage = pathname?.startsWith("/admin") ?? false;

    return (
        <>
            <DynamicLang />
            {!isAuthPage && !isAdminPage && <HeaderAuth />}
            {children}
            {!isAuthPage && !isAdminPage && <Footer />}
        </>
    );
}