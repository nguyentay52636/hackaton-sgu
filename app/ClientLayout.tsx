"use client";
import { usePathname } from "next/navigation";
// import Footer from "@/shared/components/Footer";
import { HeaderAuth } from "@/shared/components/HeaderAuth/HeaderAuth";
import { DynamicLang } from "./components/DynamicLang";
import { AccessibilityProvider } from "@/shared/lib/accessibility-context";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/auth/") ?? false;
    const isAdminPage = pathname?.startsWith("/admin") ?? false;

    return (
        <Provider store={store}>
            <AccessibilityProvider>
                <DynamicLang />
                {!isAuthPage && !isAdminPage && <HeaderAuth />}
                {children}
                {/* {!isAuthPage && !isAdminPage && <Footer />} */}
            </AccessibilityProvider>
        </Provider>
    );
}