import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from './providers/SessionProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import './globals.css';
import { ThemeProvider } from 'next-themes';
import { siteMetadata } from './metadata'; // Import the metadata component
import type { Viewport } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = siteMetadata; // Use the imported metadat

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: '#FF6F61' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
