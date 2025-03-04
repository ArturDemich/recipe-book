import type { Metadata } from 'next';
import '../styles/globals.css';
import Footer from 'components/Footer';
import Header from 'components/Header';

export const metadata: Metadata = {
  title: 'Recipe book',
  description: 'Recipe book',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
