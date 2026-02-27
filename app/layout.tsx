import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { FloatingMenu } from '@/components/floating-menu'
import { ScrollProvider } from '@/contexts/scroll-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Gabriel das Neves',
  description: 'Computer engineer and paleontology enthusiast',
}

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  viewportFit: 'cover' as const,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="bg-black">
      <body className={`${inter.className} ${roboto.variable} bg-black`}>
        <ScrollProvider>
          <FloatingMenu />
          {children}
        </ScrollProvider>
      </body>
    </html>
  )
}
