import { BsCheck2Circle } from 'react-icons/bs';
import { RiMailSendLine } from 'react-icons/ri';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div className='container py-10 text-center'>
      <BsCheck2Circle className='mx-auto mb-1 text-5xl text-green-600' />
      <div className='mb-1 text-3xl font-semibold'>Thank You</div>
      <p className='text-lg'>The order was complete successfully</p>

      <div className='mt-10 flex items-center justify-center space-x-4'>
        <RiMailSendLine className='text-5xl' />
        <p>
          An email receipt including the details about your order has beeen
          <br />
          sent to your email address. Please keep it for your records.
        </p>
      </div>

      <p className='mt-10'>
        You can visit{' '}
        <Link href='/account' className='link hover:underline'>
          Orders Page
        </Link>{' '}
        at any time to check the status of your order.
      </p>

      <Link href='/' className='btn mt-10 px-6 py-3'>
        Back to Home
      </Link>
    </div>
  );
}
