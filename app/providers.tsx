// app/providers.tsx
'use client'

import { ThemeProvider } from '@/components/providers/theme-provider'
import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}