import './globals.css';
import Header from '../components/Header';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen dots-bg">
        <Header />
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
