import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Image Generator',
  description: 'Generate stunning images with AI using advanced FLUX 1.1 Pro model. Create beautiful artwork, photos, and designs with simple text prompts.',
  keywords: 'AI, image generation, FLUX, artificial intelligence, art, design',
  authors: [{ name: 'AI Image Generator' }],
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </div>
      </body>
    </html>
  );
}