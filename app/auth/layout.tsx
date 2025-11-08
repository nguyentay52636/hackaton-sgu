import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sài Gòn Culinary Hub | Auth",
    description: "Authentication pages",
};

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
    );
}