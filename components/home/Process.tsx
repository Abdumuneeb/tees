import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { BiPen } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import Link from 'next/link';

export default function Process() {
  return (
    <div className='mb-10 bg-anti-flash-white'>
      <div className='container py-10'>
        <h2 className='mb-10 text-center text-3xl font-semibold'>How It Works</h2>
        <div className='mb-10 grid grid-cols-1 gap-4 rounded-lg border border-black/[0.15] py-6 text-center lg:grid-cols-3'>
          <div className='border-b border-black/[0.15] px-6 py-10 lg:border-r lg:border-b-0'>
            <div className='mb-3 flex items-center justify-center space-x-1.5'>
              <HiOutlineMagnifyingGlass className='text-2xl' />
              <h3 className='text-lg font-semibold'>Find Product</h3>
            </div>
            <p>Find the products you want from t-shirts and hoodies to polos and sweaters.</p>
          </div>
          <div className='border-b border-black/[0.15] px-6 py-10 lg:border-r lg:border-b-0'>
            <div className='mb-3 flex items-center justify-center space-x-1.5'>
              <BiPen className='text-2xl' />
              <h3 className='text-lg font-semibold'>Design Studio</h3>
            </div>
            <p>Using our design studio, you can create custom apparel all on our website.</p>
          </div>
          <div className='px-6 py-10'>
            <div className='mb-3 flex items-center justify-center space-x-1.5'>
              <BsPrinter className='text-2xl' />
              <h3 className='text-lg font-semibold'>Print</h3>
            </div>
            <p>We&apos;ll print your design in time and you&apos;ll be wearing it in no time!</p>
          </div>
        </div>
        <div className='flex justify-center'>
          <Link href='/categories' className='btn px-8 py-3'>
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
