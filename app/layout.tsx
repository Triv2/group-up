import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import {dark} from "@clerk/themes";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Group Up',
  description: 'Group with friends!',
  icons:[
    {
      url: '/mlogo.png',
      href: '/mlogo.png',
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider >
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
        {children}
        </Providers>
        </body>
    </html>
    </ClerkProvider>
  )
}
