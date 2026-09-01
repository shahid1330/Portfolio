import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Shahid Raza — AI/ML Engineer & Data Scientist",
  description:
    "AI/ML engineer and data scientist. Five published research papers, machine learning and data engineering work, and production-minded Python.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Data Science",
    "Data Engineering",
    "Python",
    "TensorFlow",
    "AWS",
  ],
  authors: [{ name: "Mohammad Shahid Raza" }],
  openGraph: {
    title: "Mohammad Shahid Raza — AI/ML Engineer & Data Scientist",
    description:
      "Five published research papers, machine learning and data engineering work, and production-minded Python.",
    type: "website",
  },
};

/**
 * Applies the saved theme before first paint. Without this the page would
 * render light, then flash to dark once React hydrates.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
