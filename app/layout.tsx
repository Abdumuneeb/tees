import './globals.css';
import { Montserrat } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import TopNav from '@/components/layouts/TopNav';
import Navbar from '@/components/layouts/Navbar';
import Sidebar from '@/components/layouts/Sidebar';
import Footer from '@/components/layouts/Footer';
import SessionProvider from '@/components/auth/SessionProvider';
import ClientProvider from '@/components/layouts/ClientProvider';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'ATC Tees - Around The Clock',
  description: 'ATC Tees - Around The Clock',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' className={montserrat.className}>
      <body className='flex flex-col text-dark-gunmetal [min-height:100dvh]'>
        <SessionProvider session={session}>
          <header className='fixed top-0 z-10 w-full'>
            <TopNav />
            <Navbar />
          </header>
          <Sidebar />
          <ClientProvider />
          <main className='pt-[6.3125rem]'>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
