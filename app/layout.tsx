import type {Metadata} from 'next';
import { Playfair_Display, DM_Mono } from 'next/font/google';
import './globals.css'; // Global styles
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WebGLBackground from '@/components/WebGLBackground';
import CustomCursor from '@/components/CustomCursor';
import ChatWidget from '@/components/ChatWidget';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: 'LuisPDoesAI | We Build AI That Works',
  description: 'AI consulting, automations, agentic systems, and custom AI builds.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable}`}>
      <body suppressHydrationWarning className="bg-brand-black text-brand-white font-dm">
        <CustomCursor />
        <WebGLBackground />
        <Navigation />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
