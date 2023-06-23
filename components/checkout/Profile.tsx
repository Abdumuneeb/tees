'use client';
import { type FormEvent, useRef } from 'react';
import useSWR from 'swr';
import Card from '@/components/ui/Card';
import LoadingButton from '@/components/ui/LoadingButton';
import fetcher from '@/utils/fetcher';
import useFetch from '@/utils/useFetch';
import Skeleton from '../ui/Skeleton';

interface Props {
  data: any;
  isLoading: boolean;
}

export default function Profile({ data, isLoading }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const { mutate: getUserData } = useSWR('/api/getUser', fetcher);
  const { mutate, isLoading: resLoading } = useFetch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      url: '/api/updateProfile',
      method: 'PATCH',
      body: {
        name: nameRef?.current?.value,
        phone: phoneRef?.current?.value,
      },
      messages: {
        loading: 'Updating Profile...',
        success: 'Profile Updated!',
      },
      onSuccess: () => getUserData(),
    });
  };

  return (
    <Card title='Confirm Your Information'>
      <form onSubmit={handleSubmit}>
        {isLoading ? (
          <Skeleton className='mb-2 h-[2.625rem] w-full' />
        ) : (
          <div className='mb-2 flex items-center space-x-3'>
            <label htmlFor='name' className='font-medium'>
              Name:
            </label>
            <input
              id='name'
              type='text'
              placeholder='Name'
              className='w-full'
              defaultValue={data?.name}
              ref={nameRef}
            />
          </div>
        )}
        {isLoading ? (
          <Skeleton className='mb-2 h-[2.625rem] w-full' />
        ) : (
          <div className='mb-2 flex items-center space-x-2'>
            <label htmlFor='phone' className='font-medium'>
              Phone:
            </label>
            <input
              id='phone'
              type='tel'
              placeholder='Phone'
              className='w-full'
              defaultValue={data?.phone}
              ref={phoneRef}
            />
          </div>
        )}
        <div className='flex justify-end'>
          <LoadingButton isLoading={resLoading} disabled={isLoading} className='btn-2 px-3 py-1.5'>
            Update Profile
          </LoadingButton>
        </div>
      </form>
    </Card>
  );
}
