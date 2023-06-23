'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { MdAccountCircle, MdOutlineAccountCircle } from 'react-icons/md';
import { IoImagesOutline, IoLogOutOutline } from 'react-icons/io5';
import { AiOutlineShopping } from 'react-icons/ai';

export default function AccountMenu() {
  const { data: session } = useSession();

  return (
    <div className='group relative'>
      <Link
        href={session?.user ? '/account' : '/login'}
        className='flex items-center space-x-1 font-medium duration-200 group-hover:border-primary group-hover:text-primary'
      >
        <MdAccountCircle className='text-xl' />
        <span>My Account</span>
      </Link>
      {session?.user ? (
        <div className='absolute top-7 left-1/2 z-20 hidden min-w-[10rem] -translate-x-1/2 rounded border border-black/[0.15] bg-white py-2 before:absolute before:-top-3 before:h-3 before:w-full sm:group-hover:block'>
          <Link href='/account' className='flex items-center space-x-2 px-6 py-1 hover:bg-cultured'>
            <AiOutlineShopping className='text-lg' />
            <span className='text-outer-space'>Orders</span>
          </Link>
          <Link href='/' className='flex items-center space-x-2 px-6 py-1 hover:bg-cultured'>
            <IoImagesOutline className='text-lg' />
            <span className='text-outer-space'>Designs</span>
          </Link>
          <Link href='/account/profile' className='flex items-center space-x-2 px-6 py-1 hover:bg-cultured'>
            <MdOutlineAccountCircle className='text-lg' />
            <span className='text-outer-space'>Profile</span>
          </Link>
          <Link href='/' className='flex items-center space-x-2 border-t border-light-gray px-6 py-1 hover:bg-cultured'>
            <IoLogOutOutline className='text-lg' />
            <span className='text-outer-space' onClick={() => signOut()}>
              Logout
            </span>
          </Link>
        </div>
      ) : (
        <div className='absolute top-10 left-1/2 z-20 hidden min-w-[18.75rem] -translate-x-1/2 rounded-b border-t-8 border-primary bg-white p-6 shadow-lg before:absolute before:-top-7 before:left-1/2 before:h-5 before:w-full before:-translate-x-1/2 sm:group-hover:block'>
          <div className='absolute -top-4 left-1/2 z-30 h-0 w-0 -translate-x-1/2 border-r-8 border-l-8 border-b-8 border-r-transparent border-l-transparent border-b-primary'></div>
          <h3 className='mb-2 text-lg font-semibold'>Login to Your Account</h3>
          <ul className='mb-4 ml-2 space-y-1'>
            <li className="before:mr-1 before:font-bold before:text-primary before:content-['✔︎']">
              Access your saved designs
            </li>
            <li className="before:mr-1 before:font-bold before:text-primary before:content-['✔︎']">
              Track your orders
            </li>
            <li className="before:mr-1 before:font-bold before:text-primary before:content-['✔︎']">
              Easily place a reorder
            </li>
          </ul>
          <Link href='/login' className='btn block text-base'>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
