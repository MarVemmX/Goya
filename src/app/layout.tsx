import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#E5A93C",
};

export const metadata: Metadata = {
  title: "Goya Olive Oil | Real Spanish Extra Virgin Olive Oil",
  description:
    "100% Single-Origin Andalusian Extra Virgin Olive Oil from Seville & Jaén, Spain. First cold pressed, high-polyphenol, and poured from revolutionary non-drip squeeze bottles and UV-blocking tins.",
  keywords: [
    "Goya olive oil",
    "Spanish extra virgin olive oil",
    "EVOO squeeze bottle",
    "cold pressed olive oil",
    "Andalusia Spain",
    "Picual olive oil",
    "Graza style olive oil",
    "cooking oil",
    "finishing oil",
  ],
  openGraph: {
    title: "Goya Olive Oil | Real Spanish Extra Virgin Olive Oil",
    description:
      "Direct from Andalusia, Spain. Real first cold press olive oil in squeeze bottles that make cooking actually fun.",
    images: ["/images/goya-squeeze-drizzle.jpg"],
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
      <head>
        <link rel="icon" href="/images/format-squeeze.svg" />
      </head>
      <body className="bg-background text-text selection:bg-brand selection:text-text min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
