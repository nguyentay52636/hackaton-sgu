import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/Footer/ThemeProvider";
import ClientLayout from "./ClientLayout";
import WrapTranslationProvider from "@/shared/contexts/TranslationProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem>
          <WrapTranslationProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </WrapTranslationProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
