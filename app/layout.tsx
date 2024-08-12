import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Do It Daily",
  description: "Limenough and Jeondev's daily routine challenge board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* <div className="root">{children}</div> */}
        {children}
      </body>
    </html>
  );
}
