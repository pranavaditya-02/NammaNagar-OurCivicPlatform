import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { EnhancedNavbar } from "@/components/enhanced-navbar"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { LanguageProvider } from "@/components/language-context"
import { Toaster } from "@/components/ui/toaster"
import { ChatProvider } from '@/components/chat-context'
import { ChatBot } from '@/components/ChatBot'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NammaNagar - Civic Engagement Platform",
  description: "India's leading platform for civic engagement, infrastructure monitoring, and community empowerment",
  keywords: "civic engagement, infrastructure, community, India, government, transparency, accountability",
  authors: [{ name: "NammaNagar Team" }],
  openGraph: {
    title: "NammaNagar - Civic Engagement Platform",
    description: "Empowering citizens to build better communities through transparency and accountability",
    url: "https://nammanagar.in",
    siteName: "NammaNagar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NammaNagar Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NammaNagar - Civic Engagement Platform",
    description: "Empowering citizens to build better communities",
    images: ["/twitter-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <ChatProvider>
            <div className="min-h-screen flex flex-col">
              <EnhancedNavbar />
              <main className="flex-1">{children}</main>
              <EnhancedFooter />
              <ChatBot /> {/* Moved inside the flex container */}
            </div>
            <Toaster />
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
