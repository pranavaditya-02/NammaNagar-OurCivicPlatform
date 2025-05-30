import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { EnhancedNavbar } from "@/components/enhanced-navbar"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { LanguageProvider } from "@/components/language-context"
import { Toaster } from "@/components/ui/toaster"
import { ChatProvider } from '@/components/chat-context'
import { ChatBot } from '@/components/ChatBot'
import { siteConfig } from './config'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: siteConfig.metadataBase,
  title: {
    default: 'NammaNagar - Our Civic Platform',
    template: '%s | NammaNagar'
  },
  description: 'A civic engagement platform for better community governance',
  openGraph: {
    title: 'NammaNagar - Our Civic Platform',
    description: 'A civic engagement platform for better community governance',
    url: 'https://namma-nagar.vercel.app',
    siteName: 'NammaNagar',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NammaNagar - Our Civic Platform',
    description: 'A civic engagement platform for better community governance',
  }
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
