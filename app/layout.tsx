import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Karla } from 'next/font/google'
import Footer from "@/components/Footer";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "@/components/ui/toaster";
 

const karla = Karla({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Home | Aydin Joshi",
  description: "Learn about me, my services, and my content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}
      >
         <ThemeContextProvider>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
        {/*<ThemeSwitch />*/}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
