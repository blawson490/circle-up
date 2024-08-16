import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | CircleUp',
    default: 'CircleUp',
  },
  description: "Transform your small group interactions with CircleUp, an innovative app that uses digital card decks to facilitate deeper connections, empathy, and understanding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>{children}</body>
    </html>
  );
}
