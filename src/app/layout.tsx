import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Wallet } from "@/app/components/Wallet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "leet receipt",
  description: "Create a Blockchain Receipt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <Wallet>{children}</Wallet>
      </body>
    </html>
  );
}
