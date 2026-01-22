import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammad Shahid Raza - AI/ML Engineer | Data Scientist",
  description: "Passionate AI/ML Engineer specializing in machine learning, data engineering, and cloud technologies. Building intelligent systems that transform data into impact.",
  keywords: ["AI Engineer", "Machine Learning", "Data Science", "Data Engineering", "Python", "TensorFlow", "AWS"],
  authors: [{ name: "Mohammad Shahid Raza" }],
  openGraph: {
    title: "Mohammad Shahid Raza - AI/ML Engineer",
    description: "Building Intelligent Systems That Transform Data Into Impact",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
