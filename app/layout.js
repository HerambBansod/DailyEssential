import SideNavbar from "./Components/SideNavbar";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DailyEssential",
  description: "Your daily dose of news, markets, and global time - all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen w-full flex bg-[#080808] m-auto p-6 gap-6">

        {/* Sidebar */}
        <SideNavbar />

        {/* Main Content */}
        <main >
          {children}
        </main>

      </body>
    </html>
  );
}
