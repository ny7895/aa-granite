import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SeoScript from "./components/SeoScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Double A Granite | Premium Countertop Fabrication",
  description:
    "Expert fabrication and installation of granite, quartz, and marble countertops serving Albuquerque, New Mexico. 20+ years of experience serving residential and commercial clients in Albuquerque, New Mexico.",
  keywords: [
    "granite countertops",
    "quartz installation",
    "marble fabrication",
    "custom countertops",
    "counter top fabricator Albuquerque, New Mexico",
    "granite countertops Albuquerque, New Mexico",
    "quartz installation Albuquerque, New Mexico",
    "marble fabrication Albuquerque, New Mexico",
    "custom countertops Albuquerque, New Mexico",
    "Residential countertop fabricator Albuquerque, New Mexico",
  ],
  authors: [{ name: "Double A Granite" }],
  openGraph: {
    title: "Double A Granite | Premium Countertop Fabrication",
    description:
      "Expert fabrication and installation of granite, quartz, and marble countertops in Albuquerque, New Mexico",
    url: "https://doubleagranite.com",
    siteName: "Double A Granite",
    images: [
      {
        url: "https://aa-granite.s3.us-east-1.amazonaws.com/dramatic-slabs.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SeoScript />
      </body>
    </html>
  );
}
