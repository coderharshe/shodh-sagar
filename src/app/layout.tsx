import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomNavbar from "@/components/UI/CustomNavbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shodh Sagar | Ocean of Research",
  description: "A multidisciplinary academic platform dedicated to fostering research, critical inquiry, and intellectual exchange.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-brand-gold selection:text-brand-navy`}
      >
        <CustomNavbar />
        {children}
      </body>
    </html>
  );
}
