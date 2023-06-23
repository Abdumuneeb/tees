'use client';
import Link from 'next/link';
import useSWR from 'swr';
import { FiShoppingCart } from 'react-icons/fi';
import fetcher from '@/utils/fetcher';

export default function CartMenu() {
  const { data } = useSWR('/api/getCartCount', fetcher, {
    fallbackData: '-',
  });

  return (
    <div className='group relative'>
      <Link
        href='/cart'
        className='flex items-center space-x-1 rounded-3xl font-medium duration-200 group-hover:border-primary group-hover:text-primary'
      >
        <FiShoppingCart className='text-xl' />
        <span>Cart</span>
        <span className='grid h-[1.125rem] w-[1.125rem] place-content-center rounded-full bg-dark-gunmetal text-xs text-white group-hover:bg-primary'>
          {data}
        </span>
      </Link>
      {data === 0 && (
        <div className='absolute top-10 right-0 z-20 hidden min-w-[18.75rem] rounded-b border-t-8 border-primary bg-white p-6 shadow-lg before:absolute before:-top-7 before:left-1/2 before:h-5 before:w-full before:-translate-x-1/2 sm:group-hover:block'>
          <div className='absolute -top-4 right-10 z-30 h-0 w-0 border-r-8 border-l-8 border-b-8 border-r-transparent border-l-transparent border-b-primary'></div>
          <h3 className='mb-2 text-center text-lg font-semibold'>Your Cart is Empty!</h3>
          <p className='mb-4 text-center'>Let&apos;s create something great. Click below to get started.</p>
          <Link href='/design' className='btn block text-base'>
            Start Designing
          </Link>
        </div>
      )}
    </div>
  );
}
