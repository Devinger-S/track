import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Track",
  description: "Track your time",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning className=" antialiased">
      <body className={cn(' h-screen flex flex-col  relative ',)}>
       <Providers>

        <Navbar />
        {children}
       </Providers>
       <Toaster />
       </body>
    </html>
  );
}
