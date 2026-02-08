import type { Metadata } from 'next'
import { Russo_One, Lexend_Exa } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/SmoothScroll' // Make sure path matches your file structure

const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-russo',
  display: 'swap',
})

const lexendExa = Lexend_Exa({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Danishbir Singh - Software Engineer',
  description: "Recent SJSU Master's graduate specializing in AI/ML and software development.",
  metadataBase: new URL('https://danishbir.dev'), // Replace with your actual domain
  openGraph: {
    title: 'Danishbir Singh - Software Engineer',
    description: "Recent SJSU Master's graduate specializing in AI/ML and software development.",
    url: 'https://danishbir.dev',
    siteName: 'Danishbir Singh Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danishbir Singh - Software Engineer',
    description: "Recent SJSU Master's graduate specializing in AI/ML and software development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${russoOne.variable} ${lexendExa.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"/>
      </head>
      <body className="bg-black text-white antialiased">
        <SmoothScrollProvider>
            {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}