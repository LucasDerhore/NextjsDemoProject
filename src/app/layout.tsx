// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { MissionProvider } from '@/lib/MissionContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog Missions',
  description: 'Démo Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <MissionProvider>
          <Navbar />
          <main className="max-w-4xl mx-auto">{children}</main>
        </MissionProvider>
      </body>
    </html>
  );
}