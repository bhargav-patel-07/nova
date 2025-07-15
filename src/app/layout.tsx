import './globals.css';
import Header from '../components/Header';
import Image from 'next/image';
import { ShootingStars } from '../components/ui/shooting-stars';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black">
        {/* Animated shooting stars background */}
        <ShootingStars
          className="fixed inset-0 -z-10 w-full h-full"
          starColor="#fff"
          trailColor="#00eaff"
        />
        {/* Top bar: logo + navbar */}
        <div className="w-full flex items-center px-8 pt-4">
          <div className="logo-container flex-shrink-0 flex items-center">
            {/* Logo here */}
            <Image
              src="/logo.png"
              alt="nova.ai logo"
              width={100}
              height={100}
              className="max-w-[100px] h-auto m-0 p-0"
              priority
            />
          </div>
          <Header /> {/* Navbar here */}
        </div>
        {/* Centered input box */}
        
        <footer>Footer</footer>
      </body>
    </html>
  );
}
