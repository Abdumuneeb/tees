import Image from 'next/image';
import Link from 'next/link';

export default function Help() {
  return (
    <div className='container mb-10 flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0'>
      <div className='flex-1 text-center sm:text-left'>
        <h2 className='mb-1 text-3xl font-semibold'>
          Need Help?
          <br />
          Chat with a Real Expert
        </h2>
        <p className='mb-10 text-lg'>
          Need assistance or have a custom request? Call us today for assistance. From teams to events we have the
          capabilities to ensure you get the products you need.
        </p>
        <Link href='/design' className='btn px-8 py-3'>
          Chat Now
        </Link>
      </div>
      <div className='flex flex-1 justify-end'>
        <Image src='/help.webp' alt='design' width={568} height={426} className='h-auto w-auto' />
      </div>
    </div>
  );
}
