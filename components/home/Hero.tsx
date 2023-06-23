'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Hero() {
  return (
    <div className='bg-anti-flash-white'>
      <Carousel
        showThumbs={false}
        infiniteLoop
        showStatus={false}
        emulateTouch
        interval={3000}
        autoPlay={true}
        className='mb-10'
      >
        <div className='container grid grid-cols-1 py-20 lg:grid-cols-2 lg:text-left'>
          <div>
            <h1 className='mb-4 text-5xl font-extrabold'>The Leader in Quality Custom T-Shirts</h1>
            <p className='mb-10 text-xl'>Best Pricing Online, Easy to Use Design Lab, 100% Gurantee Fast Turnaround</p>
            <Link href='/design' className='btn px-12 py-4'>
              Start Designing
            </Link>
          </div>
          <div className='relative hidden lg:block'>
            <Image
              src='/hero2.webp'
              alt='atctees'
              className='object-contain'
              fill
              loading='eager'
              sizes='(min-width: 1024px) 50vw,
              0vw'
            />
          </div>
        </div>
        <div className='container grid grid-cols-1 py-20 lg:grid-cols-2 lg:text-left'>
          <div>
            <h1 className='mb-4 text-5xl font-extrabold'>Design Anywhere at Anytime On Any Device</h1>
            <p className='mb-10 text-xl'>Best Pricing Online, Easy to Use Design Lab, 100% Gurantee Fast Turnaround</p>
            <Link href='/design' className='btn px-12 py-4'>
              Start Designing
            </Link>
          </div>
          <div className='relative hidden lg:block'>
            <Image
              src='/hero1.webp'
              alt='atctees'
              className='object-contain'
              fill
              sizes='(min-width: 1024px) 50vw,
              0vw'
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
