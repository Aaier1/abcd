import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'
import Navigation from '@/components/Navigation'
import './globals.css'
import { constructMetadata } from '@/lib/metadata'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
