import "nglty/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "nglty/trpc/react";
import { LoadingProvider } from "nglty/contexts/loadingContext";
import { Header } from "nglty/components/general/header";
import { auth } from "nglty/server/auth";
import { ThemeProvider } from "nglty/contexts/themeProvider";
import { Mona_Sans } from "next/font/google";

const fontSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "NGTLY",
  description: "discover the universe with us",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  
  return (
    <html lang="en" className={`font-sans antialiased ${fontSans.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <body className="dark:bg-aurora">
          <TRPCReactProvider>
            {session?.user && <Header />}
          <main className="mx-auto pl-3 pr-3 sm:pl-3 sm:pr-3 w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <LoadingProvider>
            {children}
          </LoadingProvider>
          </main>
        </TRPCReactProvider>
      </body>
      </ThemeProvider>
    </html>
  );
}
