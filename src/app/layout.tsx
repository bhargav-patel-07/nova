import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-black">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
