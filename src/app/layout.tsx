import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { CommandMenu } from "@/components/cmd-k/command-menu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kelvin Sundli",
  description: "Personal website of Kelvin Sundli",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${GeistSans.className} bg-black text-white antialiased h-full`}>
        <main className="mx-auto max-w-4xl px-4 py-8 h-full">
          {children}
        </main>
        <CommandMenu />
      </body>
    </html>
  );
}
