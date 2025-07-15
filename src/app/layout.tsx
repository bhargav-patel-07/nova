import './globals.css';
import Header from '../components/Header';
import Image from 'next/image';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen dots-bg">
        {/* Optimized logo and navbar alignment */}
        <div className="w-full flex items-center gap-8 px-8 pt-2">
          <div className="logo-container flex-shrink-0 flex items-center">
            <Image
              src="/logo.png"
              alt="nova.ai logo"
              width={230}
              height={230}
              className="max-w-[230px] h-auto"
              priority
            />
          </div>
          <Header />
        </div>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
