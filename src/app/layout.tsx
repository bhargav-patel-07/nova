import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { StarsBackground } from '../components/ui/stars-background';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black">
        <ClerkProvider>
          <StarsBackground className="!fixed !inset-0 !w-full !h-full !z-0" />
          <div className="relative z-10">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
