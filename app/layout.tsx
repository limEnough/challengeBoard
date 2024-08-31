import type { Metadata } from "next";
import Header from "./components/header/Header";
import ToastProvider from "./lib/toastProvider/ToastProvider";

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
        <div className="root-layout">
          <ToastProvider />
          <Header />
          {children}
        </div>

        {/* Portal */}
        <div id="root-modal"></div>
      </body>
    </html>
  );
}
