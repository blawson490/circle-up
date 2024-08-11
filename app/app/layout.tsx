import type { Metadata } from "next";
import TopBar from "./ui/topbar/topbar";

export const metadata: Metadata = {
  title: "CircleUp App",
  description: "CircleUp Card Decks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col">
      {children}
    </div>
  );
}
