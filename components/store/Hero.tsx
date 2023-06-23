'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import fetcher from '@/utils/fetcher';
import Skeleton from '../ui/Skeleton';

export default function Hero() {
  const pathname = usePathname();
  const { data, isLoading } = useSWR(`/api/getStore/${pathname?.split('/')[2]}`, fetcher);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading)
    return (
      <div className='bg-anti-flash-white'>
        <div className='container grid grid-cols-1 py-20 lg:grid-cols-2 lg:text-left'>
          <div className='text-center lg:text-left'>
            <Skeleton className='mb-4 h-12 w-full' />
            <Skeleton className='mb-10 h-[5.25rem] w-full' />
            <div className='grid justify-center gap-2 sm:flex sm:space-x-2 lg:justify-start'>
              <Link
                href={`/stores/${pathname?.split('/')[2]}/`}
                className='btn border-2 border-primary px-10 py-3.5 font-semibold hover:border-primary-hover'
              >
                Store Home
              </Link>
              <Link href={`/stores/${pathname?.split('/')[2]}/products`} className='btn-alt px-10 py-3.5 font-semibold'>
                Store Products
              </Link>
            </div>
          </div>
          <div className='relative hidden lg:block'>
            <Skeleton className='mx-auto h-full w-1/2' />
          </div>
        </div>
      </div>
    );

  return (
    <div className='text-white' style={{ backgroundColor: data.bannerColor ?? '#03062E' }}>
      <div className='container grid grid-cols-1 py-20 lg:grid-cols-2 lg:text-left'>
        <div className='text-center lg:text-left'>
          <h1 className='mb-6 text-5xl font-extrabold'>{data.name}</h1>
          <div className='mb-4 grid max-w-md grid-cols-7 font-semibold'>
            <div>
              <div className='mb-2 text-sm uppercase sm:text-base'>Day</div>
              <div className='text-xl font-medium'>{currentTime.date()}</div>
            </div>
            <div className='mt-auto text-xl font-medium'>:</div>
            <div>
              <div className='mb-2 text-sm uppercase sm:text-base'>Hour</div>
              <div className='text-xl font-medium'>{currentTime.hour()}</div>
            </div>
            <div className='mt-auto text-xl font-medium'>:</div>
            <div>
              <div className='mb-2 text-sm uppercase sm:text-base'>Minute</div>
              <div className='text-xl font-medium'>{currentTime.minute()}</div>
            </div>
            <div className='mt-auto text-xl font-medium'>:</div>
            <div>
              <div className='mb-2 text-sm uppercase sm:text-base'>Second</div>
              <div className='text-xl font-medium'>{currentTime.second()}</div>
            </div>
          </div>
          <div className='mb-6 max-w-md text-center text-lg font-semibold'>
            Ends {currentTime.endOf('month').format('DD MMMM YYYY')}
          </div>
          <div className='grid justify-center gap-2 sm:flex sm:space-x-2 lg:justify-start'>
            <Link
              href={`/stores/${pathname?.split('/')[2]}/`}
              className='btn border-2 border-primary px-8 py-2.5 font-semibold hover:border-primary-hover'
            >
              Store Home
            </Link>
            <Link href={`/stores/${pathname?.split('/')[2]}/products`} className='btn-alt px-8 py-2.5 font-semibold'>
              Store Products
            </Link>
          </div>
        </div>
        <div className='relative hidden lg:block'>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${data.logo}`}
            alt='atctees'
            className='object-contain'
            fill
            loading='eager'
            sizes='(min-width: 1024px) 50vw,
              0vw'
          />
        </div>
      </div>
    </div>
  );
}
