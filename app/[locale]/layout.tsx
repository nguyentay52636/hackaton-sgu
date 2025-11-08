import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/shared/components/Footer/ThemeProvider";
import ClientLayout from "../ClientLayout";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
          >
            <ClientLayout>
              {children}
            </ClientLayout>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

