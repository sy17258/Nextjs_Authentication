import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import SmoothScrollProvider from './components/SmoothScrollProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth - Modern Authentication',
  description: 'A secure and modern authentication app built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="hydrated">
      <body className={inter.className}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </body>
    </html>
  )
}