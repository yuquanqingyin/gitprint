import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Git Print",
  description: "Print your favourite Git repositories as PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
