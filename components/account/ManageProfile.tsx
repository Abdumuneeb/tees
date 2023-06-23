'use client';
import { type FormEvent, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import Card from '@/components/ui/Card';
import LoadingButton from '@/components/ui/LoadingButton';
import useFetch from '@/utils/useFetch';
import fetcher from '@/utils/fetcher';
import Skeleton from '../ui/Skeleton';

export default function ManageProfile() {
  const { data: session } = useSession();
  const { data, isLoading } = useSWR('/api/getUser', fetcher);
  const [name, setName] = useState(session?.user.name);
  const phoneRef = useRef<HTMLInputElement>(null);
  const { mutate, isLoading: resLoading } = useFetch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      url: '/api/updateProfile',
      method: 'PATCH',
      body: {
        name,
        phone: phoneRef?.current?.value,
      },
      messages: {
        loading: 'Updating Profile...',
        success: 'Profile Updated!',
      },
    });
  };

  return (
    <Card title='Manage Profile'>
      <form onSubmit={handleSubmit}>
        <div className='mb-2 flex items-center space-x-3'>
          <label htmlFor='name' className='font-medium'>
            Name:
          </label>
          <input
            id='name'
            type='text'
            placeholder='Name'
            className='w-full'
            value={name as string}
            onChange={e => setName(e.target.value)}
          />
        </div>
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
