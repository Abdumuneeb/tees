import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className='bg-anti-flash-white'>
      <div className='container mb-10 flex flex-col items-center space-y-6 py-10 sm:flex-row sm:space-y-0'>
        <div className='flex-1'>
          <Image src='/team.webp' alt='team' width={628} height={426} className='h-auto w-auto rounded-lg' />
        </div>
        <div className='flex-1 text-center sm:text-left'>
          <h2 className='mb-1 text-3xl font-semibold'>
            About Us
            <br />
            Your Team & Event Experts!
          </h2>
          <p className='mb-10 text-lg'>
            With over 20 years experience in the screen printing industry, we’re the custom printing experts for screen
            printing and embroidery in New Jersey that delivers exceptional printed and promotional products all across
            the country.
          </p>
          <Link href='/design' className='btn px-8 py-3'>
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
