'use client';
import { usePathname, redirect } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import dayjs from 'dayjs';
import Skeleton from '@/components/ui/Skeleton';
import fetcher from '@/utils/fetcher';
import Avatar from '@/components/ui/Avatar';
import Rating from '@/components/ui/Rating';
import AddReview from '@/components/account/AddReview';

export default function ReviewProduct() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data, isLoading } = useSWR(
    `/api/getOrderProduct/${pathname?.split('/')[3]}/${pathname?.split('/')[4]}`,
    fetcher
  );

  return (
    <div className='flex-1'>
      {isLoading ? (
        <Skeleton className='mx-auto mb-6 h-9 w-5/6' />
      ) : data?.type === 'review' ? (
        <Link
          href={`/products/${data?.data?.product?.slug}`}
          className='mb-6 block text-center text-3xl font-semibold hover:underline'
        >
          Your Review: {data?.data?.product?.title}
        </Link>
      ) : (
        <Link
          href={`/products/${data?.data?.productStock?.product?.slug}`}
          className='mb-6 block text-center text-3xl font-semibold hover:underline'
        >
          Review {data?.data?.productStock?.product?.title}
        </Link>
      )}
      {isLoading ? (
        <Skeleton className='mx-auto h-9 w-5/6' />
      ) : data?.type === 'review' ? (
        <div className='rounded bg-anti-flash-white p-6'>
          <div className='mb-2 flex items-start space-x-2'>
            <Avatar name={session?.user.name || ''} />
            <div>
              <div className='mr-2 font-semibold'>{session?.user.name || ''}</div>
              <div className='text-sm'>{dayjs(data?.data?.createdAt).format('DD MMM YY')}</div>
            </div>
          </div>
          <Rating rating={data?.data?.rating} className='mb-2' />
          <p>{data?.data?.review}</p>
        </div>
      ) : (
        <AddReview
          orderCode={pathname?.split('/')[2] as string}
          orderProductId={parseInt(pathname?.split('/')[3] as string)}
          productId={data?.data?.productStock?.product?.id}
        />
      )}
    </div>
  );
}
