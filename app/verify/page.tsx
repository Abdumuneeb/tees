import Image from 'next/image';

export default function Verify() {
  return (
    <div className='my-20 mx-4 grid place-content-center'>
      <div className='flex max-w-lg flex-col items-center rounded border border-light-gray p-10 text-center'>
        <Image src='/logo.webp' alt='atctees' width={160} height={96} className='mb-10' />
        <h1 className='text-2xl font-semibold'>Check your email</h1>
        <p className='mb-4'>A sign in link has been sent to your email address.</p>
      </div>
    </div>
  );
}
