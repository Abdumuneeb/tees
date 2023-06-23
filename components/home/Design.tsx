import Image from 'next/image';
import Link from 'next/link';

export default function Design() {
  return (
    <div className='container mb-10 flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0'>
      <div className='flex-1'>
        <Image src='/design.webp' alt='design' width={572} height={426} className='h-auto w-auto' />
      </div>
      <div className='flex-1 text-center sm:text-left'>
        <h2 className='mb-1 text-3xl font-semibold'>
          The Design Lab
          <br />
          No Lab Coat Required
        </h2>
        <p className='mb-10 text-lg'>
          Bring your creation to life and design your own apparel, Easy Customization, Choose Your Product And Start
          Customizing!
        </p>
        <Link href='/design' className='btn px-8 py-3'>
          Start Designing
        </Link>
      </div>
    </div>
  );
}
