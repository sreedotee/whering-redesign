import type { Metadata } from "next";
import "./globals.css";
import Annotator from "./components/Annotator";
import FontChecker from "./components/FontChecker";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whering Redesign Case Study",
  description:
    "A strategic product design case study on reframing Whering's digital wardrobe experience around clearer hierarchy, collections, and a connected discovery loop.",
  keywords:
    "product design, UX design, case study, fashion app, Whering",
  openGraph: {
    title: "Whering Redesign Case Study",
    description:
      "Strategic product design case study with interactive decision documentation",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whering Redesign Case Study",
    description: "Reframing a digital wardrobe around hierarchy, collections, and a connected discovery loop.",
    images: ["/twitter-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Annotator />
        <FontChecker />
      </body>
    </html>
  );
}
