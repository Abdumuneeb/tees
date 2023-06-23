'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AccountPanel from '@/components/account/AccountPanel';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.status === 'unauthenticated') redirect('/');

  return (
    <div className='py-10'>
      <div className='container flex flex-col gap-6 lg:flex-row lg:items-start'>
        <AccountPanel />
        {children}
      </div>
    </div>
  );
}
