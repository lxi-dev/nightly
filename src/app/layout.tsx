import "nglty/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "nglty/trpc/react";
import { LoadingProvider } from "nglty/contexts/loadingContext";
import { Header } from "nglty/components/general/header";
import { auth } from "nglty/server/auth";

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
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="dark:bg-aurora">
          <TRPCReactProvider>
            {session?.user && <Header />}
        <LoadingProvider>
          {children}
        </LoadingProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
