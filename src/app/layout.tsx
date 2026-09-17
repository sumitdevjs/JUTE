import React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidebarCart from "@/components/SidebarCart";
import FloatingContact from "@/components/FloatingContact";
import { CartProvider } from "@/context/CartContext";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import Script from "next/script";

const BASE_URL = "https://jute-ashok-enterprises.vercel.app";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ashok Enterprises — Premium Jute Bags & Eco-Friendly Products India",
    template: "%s | Ashok Enterprises",
  },
  description:
    "Buy premium handcrafted jute bags, eco-friendly tote bags, jute curing sheets, gunny bags & bulk raw jute materials. Direct from manufacturer in West Bengal, India. GOTS certified, 100% natural & sustainable. Pan-India delivery.",
  keywords: [
    "jute bags",
    "jute bags online",
    "eco friendly bags",
    "jute tote bags",
    "jute shopping bags",
    "handcrafted jute bags",
    "jute lunch bag",
    "jute gift bags",
    "jute bags wholesale",
    "bulk jute bags India",
    "jute bags manufacturer",
    "organic jute products",
    "sustainable bags India",
    "jute curing sheets",
    "concrete curing jute",
    "hessian cloth",
    "gunny bags",
    "jute sacking bags",
    "burlap bags India",
    "jute raw materials",
    "ashok enterprises",
    "ashok enterprises jute",
    "jute bags West Bengal",
    "eco friendly shopping bags",
    "biodegradable bags",
    "custom printed jute bags",
    "corporate gifting jute bags",
    "Madhubani jute bags",
    "Pichwai jute bags",
    "artisanal jute products",
  ],
  authors: [{ name: "Ashok Enterprises" }],
  creator: "Ashok Enterprises",
  publisher: "Ashok Enterprises",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Ashok Enterprises",
    title: "Ashok Enterprises — Premium Jute Bags & Eco-Friendly Products India",
    description:
      "Buy premium handcrafted jute bags, curing sheets & raw jute materials. Direct from manufacturer, pan-India delivery. GOTS certified, 100% natural.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ashok Enterprises — Premium Jute Products India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashok Enterprises — Premium Jute Bags & Eco-Friendly Products",
    description:
      "Handcrafted jute bags, curing sheets & bulk raw materials. Direct from manufacturer in West Bengal. GOTS certified, 100% natural.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand_logo.png",
    apple: "/brand_logo_final.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18379389647"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18379389647');
          `}
        </Script>
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <OrganizationJsonLd
          name="Ashok Enterprises"
          url={BASE_URL}
          logo={`${BASE_URL}/brand_logo_final.png`}
          phone="+919968648541"
          description="Premium handcrafted jute bags, eco-friendly tote bags, jute curing sheets & bulk raw jute materials. Direct from manufacturer in West Bengal, India."
        />
        <LocalBusinessJsonLd
          name="Ashok Enterprises"
          url={BASE_URL}
          phone="+919968648541"
          image={`${BASE_URL}/brand_logo_final.png`}
          address={{
            street: "Kolkata",
            city: "Kolkata",
            state: "West Bengal",
            postalCode: "700001",
            country: "IN",
          }}
        />
        <WebSiteJsonLd name="Ashok Enterprises" url={BASE_URL} />
        <CartProvider>
          <SmoothScroll>
            <Navbar />
            <SidebarCart />
            <FloatingContact />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </SmoothScroll>
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

