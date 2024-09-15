import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import AuthProvider from "@/providers/session-provider";

const fontSans=FontSans({
   subsets:["latin"],
   variable:"--font-sans"
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <QueryProvider>
         <AuthProvider session={session}>
          {children}
          </AuthProvider>
          </QueryProvider>
        <Toaster/>
      </body>
    </html>
  );
}
