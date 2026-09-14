import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safwan Khan | Full-Stack & Frontend Engineer",
  description: "Portfolio of Safwan Khan, Full-Stack & Frontend Engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-main text-sec font-cabinet antialiased selection:bg-accent selection:text-sec">
        {children}
      </body>
    </html>
  );
}
