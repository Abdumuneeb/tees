'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { IoImagesOutline, IoLogOutOutline } from 'react-icons/io5';
import { AiOutlineShopping } from 'react-icons/ai';
import Avatar from '@/components/ui/Avatar';

export default function AccountPanel() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className='rounded border lg:w-80'>
      <div className='flex items-center justify-center space-x-2 border-b bg-anti-flash-white py-4'>
        <Avatar name={session?.user?.name!} />
        <div>
          <div className='font-semibold'>{session?.user.name}</div>
          <div className='text-sm'>{session?.user.email}</div>
        </div>
      </div>
      <div>
        <Link
          href='/account'
          className={`${
            pathname === '/account' ? 'bg-cultured' : 'hover:bg-cultured'
          } flex items-center space-x-2 border-b py-3 px-6`}
        >
          <AiOutlineShopping className='text-xl' />
          <span>Orders</span>
        </Link>
        <Link href='/account' className='flex items-center space-x-2 border-b py-3 px-6 hover:bg-cultured'>
          <IoImagesOutline className='text-xl' />
          <span>Designs</span>
        </Link>
        <Link
          href='/account/profile'
          className={`${
            pathname === '/account/profile' ? 'bg-cultured' : 'hover:bg-cultured'
          } flex items-center space-x-2 border-b py-3 px-6`}
        >
          <MdOutlineAccountCircle className='text-xl' />
          <span>Profile</span>
        </Link>
        <button className='flex w-full items-center space-x-2 py-3 px-6 hover:bg-cultured' onClick={() => signOut()}>
          <IoLogOutOutline className='text-xl' />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
