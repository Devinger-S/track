'use client'

import { SessionProvider } from 'next-auth/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
  return (
      <NextThemesProvider enableSystem disableTransitionOnChange attribute="class" defaultTheme="system">
       <SessionProvider 
       > 
        {children}
       </SessionProvider>
      </NextThemesProvider>
  )
}