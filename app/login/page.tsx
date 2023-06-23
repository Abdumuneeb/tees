'use client';
import { useState } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import LoadingButton from '@/components/ui/LoadingButton';
import { redirect } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  if (session.status === 'authenticated') redirect('/');

  return (
    <div className='my-20 mx-4 grid place-content-center'>
      <div className='flex max-w-lg flex-col items-center rounded border border-light-gray p-10 text-center'>
        <Image src='/logo.webp' alt='atctees' width={160} height={96} className='mb-10' />
        <h1 className='text-2xl font-semibold'>Login to Your Account</h1>
        <p className='mb-4'>
          Enter your email address to access your saved designs, track your orders, and place a reorder!
        </p>
        <form
          className='mb-4 grid w-full gap-2'
          onSubmit={e => {
            e.preventDefault();
            setIsLoading(true);
            signIn('email', { email });
          }}
        >
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter Your Email Address'
            required
          />
          <LoadingButton className='btn py-2.5' isLoading={isLoading}>
            Sign In
          </LoadingButton>
        </form>

        <div className='mb-4 flex w-full items-center space-x-2'>
          <span className='h-[1px] flex-1 bg-light-gray'></span>
          <span>OR</span>
          <span className='h-[1px] flex-1 bg-light-gray'></span>
        </div>

        <button className='btn w-full py-2.5' onClick={() => signIn('google')}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
}
