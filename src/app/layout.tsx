import type React from "react"
import "nglty/styles/globals.css"

import type { Metadata } from "next"

import { TRPCReactProvider } from "nglty/trpc/react"
import { LoadingProvider } from "nglty/contexts/loadingContext"
import { Header } from "nglty/components/general/header"
import { auth } from "nglty/server/auth"
import { ThemeProvider } from "nglty/contexts/themeProvider"
import { Hubot_Sans, Mona_Sans } from "next/font/google"
import { UserProvider } from "nglty/contexts/profileContext"

const fontSans = Mona_Sans({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mona-sans",
})

const fontMono = Hubot_Sans({
  weight: ['500'],
  style: ['normal'],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hubot-sans",
})

export const metadata: Metadata = {
  title: "NGTLY",
  description: "discover the universe with us",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()

  if (!session) {
    return (
      <html lang="en" suppressHydrationWarning className={`antialiased ${fontSans.variable} ${fontMono.variable}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className="bg-gray-50 dark:bg-aurora">
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <div className="min-h-screen">
              <TRPCReactProvider>
  
                <main className="mx-auto px-3 sm:px-3 w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                  <LoadingProvider>
                    {children}
                    </LoadingProvider>
                </main>
  
              </TRPCReactProvider>
            </div>
          </ThemeProvider>
  
        </body>
      </html>
    );
  }
  return (
    <html lang="en" suppressHydrationWarning className={`font-sans antialiased ${fontSans.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <div className="min-h-screen dark:bg-aurora">
            <TRPCReactProvider>
              <UserProvider>
              <Header />

              <main className="mx-auto px-3 sm:px-3 w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                <LoadingProvider>
                  {children}
                  </LoadingProvider>
              </main>

              </UserProvider>
            </TRPCReactProvider>
          </div>
        </ThemeProvider>

      </body>
    </html>
  )
}

