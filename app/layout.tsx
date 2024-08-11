import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Challenge Board",
  description: "Limenough and Jeondev's daily routine challenge board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Layout UI */}
        <div className="root-layout">{children}</div>
      </body>
    </html>
  );
}
